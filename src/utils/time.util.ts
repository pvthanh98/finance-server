export function isExpired (date: string, expireInSecond: number){
    const dateNow : any = new Date();
    const date1 : any = new Date(date);
    const miliseconds: number = dateNow - date1;    
    const seconds = miliseconds / 1000;  
    return seconds > expireInSecond;
}