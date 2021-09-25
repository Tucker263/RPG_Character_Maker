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

        return status.getStrength() * (1 + traitsPer);
    }

    fetchAgilityWithStatus(status){
        let traitsPer = 0;

        if(this.traits === "bat out of hell") traitsPer = 0.4;
        if(this.traits === "brave" || this.traits === "tomboy") traitsPer = 0.1;

        return status.getAgility() * (1 + traitsPer);
    }

    fetchResilienceWithStatus(status){
        let traitsPer = 0;

        return status.getResilience() * (1 + traitsPer);
    }

    fetchWisdomWithStatus(status){
        let traitsPer = 0;
    
        return status.getWisdom() * (1 + traitsPer);
    }

    fetchLuckWithStatus(status){
        let traitsPer = 0;

        if(this.traits === "brave") traitsPer = 0.2;
        if(this.traits === "lucky devil") traitsPer = 0.5;

        return status.getLuck() * (1 + traitsPer);
    }
}


class RPGCharacter{
    constructor(){
        //初期状態
        this.name = "Unknown";
        this.gender = "male";
        this.job = "hero";
        this.imgUrl = config.imgUrl + `${this.gender}-${this.job}.png`;
        this.status = new Status();
        this.traitsWrapper = new TraitsWrapper("everyman");
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
        return config.imgUrl + `${this.gender}-${this.job}.png`;
    }

    getStatus(){
        return this.status;
    }

    getTraitsWrapper(){
        return this.traitsWrapper;
    }
}

//Controlerの設計?、実際にはMVVMのVM(ViewModel)にあたる
//MVVMはMVCから派生した
//VMは双方向バインディングの管理の仕組み？
//VueはVMオブジェクト
//つまり、VMの部分の管理を任せることができるということ
//どうデータをどう更新するかはcomputedなどで自分で定義する
var gameMaker = new Vue({
    el: "#gameMaker",
    data: {
        person: new RPGCharacter()
    },
    computed: {
        name: function(){
            return this.person.getName();
        },
        job: function(){
            return this.person.getJob();
        },
        gender: function(){
            return this.person.getGender();
        },
        traits: function(){
            return this.person.getTraitsWrapper().getTraits();
        },
        strength: function(){
            let traitsWrapper = this.person.getTraitsWrapper();
            let status = this.person.getStatus();
            return traitsWrapper.fetchStrengthWithStatus(status);
        },
        agility: function(){
            let traitsWrapper = this.person.getTraitsWrapper();
            let status = this.person.getStatus();
            return traitsWrapper.fetchAgilityWithStatus(status);
        },
        resilience: function(){
            let traitsWrapper = this.person.getTraitsWrapper();
            let status = this.person.getStatus();
            return traitsWrapper.fetchResilienceWithStatus(status);
        },
        wisdom: function(){
            let traitsWrapper = this.person.getTraitsWrapper();
            let status = this.person.getStatus();
            return traitsWrapper.fetchWisdomWithStatus(status);
        },
        luck: function(){
            let traitsWrapper = this.person.getTraitsWrapper();
            let status = this.person.getStatus();
            return traitsWrapper.fetchLuckWithStatus(status);
        }
    }
});