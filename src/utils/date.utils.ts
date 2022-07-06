export function formatDate (dateString: string, format = 'dd-mm-yyyy') {
    const dateNow = new Date(dateString);
    const date = dateNow.getDate();
    const month = dateNow.getMonth() + 1;
    const year = dateNow.getFullYear();
    const dateFormat = date > 10 ? date : `0${date}`
    const monthFormat = month > 10 ? month : `0${month}`
    return format.replace('dd', `${dateFormat}`).replace('mm',`${monthFormat}`).replace('yyyy', `${year}`)
}