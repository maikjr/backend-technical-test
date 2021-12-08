import { S3 } from 'aws-sdk'

import { File, UploadedFile, IFileProvider } from '../IFileProvider'
import { s3Config } from '../../main/config/s3'

export class FileUploadProvider implements IFileProvider {
  private client: S3

  private readonly bucketName = s3Config.bucketName

  constructor() {
    this.client = new S3({
      region: s3Config.defaultRegion
    })
  }

  private generateFileKey(file: File, timestamp: number): string {
    return `${file.name}-${timestamp}.${file.extension}`
  }

  public async deleteFile (image: string): Promise<void> {
    const splitImage = image.split('/')
    await this.client
      .deleteObject({
        Bucket: this.bucketName,
        Key: splitImage[1]
      })
      .promise()
  }

  private async uploadFile(file: File): Promise<string> {
    const timestamp = Date.now()
    const fileKey = this.generateFileKey(file, timestamp)
    await this.client
      .putObject({
        Bucket: this.bucketName,
        Key: fileKey,
        ContentType: file.type,
        Body: file.content,
        ACL: s3Config.defaultFilesACL
      })
      .promise()

    return `${this.bucketName}/${fileKey}`
  }

  async upload(files: File): Promise<UploadedFile | undefined> {
    try {
      if (Array.isArray(files)) {
        const paths = await Promise.all(
          files.map(async file => this.uploadFile(file))
        )
        return paths.map(path => ({ path }))
      }

      const path = await this.uploadFile(files)

      return {
        path
      }
    } catch (err) {
      return undefined
    }
  }
}
