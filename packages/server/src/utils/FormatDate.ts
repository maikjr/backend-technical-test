export default function formateDate(date: string): string {
  const split = date.split('/')
  return `${split[2]}-${split[1]}-${split[0]}`
}
