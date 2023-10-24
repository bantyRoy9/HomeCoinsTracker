export const stringTransform = (str,transform) =>{
    if(str && transform){
        transform = transform.toUpperCase();
        switch(transform){
            case "L" :
                return str.toLowerCase();
            case "U" :
                return str.toUpperCase();
            case "C" :
                return str.charAt(0).toUpperCase() + str.slice(1);
            default :
                return str;
        }
    }
}