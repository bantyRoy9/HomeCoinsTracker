class ApiFeature {
    constructor(modal,query){
        this.modal = modal;
        this.query = query;
    };

    filter(){
        let queryObj = {...this.query};
        const removeObjKey = ['page','filter','search','sort','type','isGraph'];
        removeObjKey.forEach(el=> delete queryObj[el]);
        let queryStr = JSON.stringify(queryObj).replace(/\b(gt|gte|lte|lt)\b/g, match=> `$${match}`);
        console.log(queryStr);
        
        this.modal = this.modal.find(JSON.parse(queryStr));
        return this;
    };
};

module.exports = ApiFeature