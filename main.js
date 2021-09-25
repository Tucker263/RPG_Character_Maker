//------------Modelの設計----------------
//読み取り専用
const config = {
    imgUrl: "https://recursionist.io/img/dashboard/lessons/quickstart/",
    gender: ["male", "female"],
    job: ["hero", "warrior", "mage"]
};

class TraitsReader{
    static basicTraitsArr = ["everyman", "bat out of hell"];

    static getTraitsArr(gender, job){
        let traitsArr =　JSON.parse(JSON.stringify(TraitsReader.basicTraitsArr));

        if(gender === "male") traitsArr.append("lucky devil");
        if(gender === "female") traitsArr.append("tomboy");
        if(job === "hero") traitsArr.append("brave");

        return traitsArr;
    }
}

//本実装
class Status{
    constructor(){
        this.strength = 10;
        this.agility = 10;
        this.resilience = 10;
        this.wisdom = 10;
        this.luck = 10;
    }

    getStrength(){
        return this.strength;
    }

    getAgility(){
        return this.agility;
    }

    getResilience(){
        return this.resilience;
    }

    getWisdom(){
        return this.wisdom;
    }

    getLuck(){
        return this.luck;
    }
}

class TraitsWrapper{
    constructor(traits){
        this.traits = traits;
    }

    getTraits(){
        return this.traits;
    }

    fetchStrengthWithStatus(status){
        let traitsPer = 0;

        if(this.traits === "brave" || this.traits === "tomboy") traitsPer = 0.1;

        return status.getStrength() * (1 * traitsPer);
    }

    fetchAgilityWithStatus(status){

    }

    fetchResilienceWithStatus(status){

    }

    fetchWisdomWithStatus(status){

    }

    fetchLuckWithStatus(status){

    }
}


class RPGCharacter{
    constructor(){
        this.name = "";
        this.gender = "";
        this.job = "";
        this.imgUrl = "";
        this.status = null;
        this.traitsWrapper = null;
    }

    setName(name){
        this.name = name;
    }

    setGender(gender){
        this.gender = gender;
    }

    setJob(job){
        this.job = job;
    }

    setImgUrl(gender, job){
        this.imgUrl = config.imgUrl + `${gender}-${job}.png`;
    }

    setStatus(status){
        this.status = status;
    }

    setTraitsWrapper(traitsWrapper){
        this.traitsWrapper = traitsWrapper;
    }

    getName(){
        return this.name;
    }

    getGender(){
        return this.gender;
    }

    getJob(){
        return this.job;
    }

    getImgUrl(){
        return this.imgUrl;
    }

    getStatus(){
        return this.status;
    }

    getTraitsWrapper(){
        return this.traitsWrapper;
    }
}

var gameMaker = new Vue({
    el: "#gameMaker",
    data: {
        person: new RPGCharacter()
    },
    computed: {

    }
});