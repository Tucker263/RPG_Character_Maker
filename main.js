//MVVM(Model, View, ModelView)パターン

//------------Modelの設計----------------
//読み取り専用
const config = {
    imgUrl: "https://recursionist.io/img/dashboard/lessons/quickstart/",
    genderArr: ["male", "female"],
    jobArr: ["hero", "warrior", "mage"]
};

class TraitsReader{
    static basicTraitsArr = ["everyman", "bat out of hell"];

    static getTraitsArr(gender, job){
        let traitsArr =　JSON.parse(JSON.stringify(TraitsReader.basicTraitsArr));

        if(gender === "male") traitsArr.push("lucky devil");
        if(gender === "female") traitsArr.push("tomboy");
        if(job === "hero") traitsArr.push("brave");

        return traitsArr;
    }
}
//ここまで読み取り専用

class Status{
    constructor(){
        this.strength = 0;
        this.agility = 0;
        this.resilience = 0;
        this.wisdom = 0;
        this.luck = 0;

        //初期状態の設定
        this.setStrength(10);
        this.setAgility(10);
        this.setResilience(10);
        this.setWisdom(10);
        this.setLuck(10);
    }

    setStrength(value){
        this.strength = value;
    }

    setAgility(value){
        this.agility = value;
    }

    setResilience(value){
        this.resilience = value;
    }

    setWisdom(value){
        this.wisdom  = value;
    }

    setLuck(value){
        this.luck = value;
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
        this.traits = "";

        //初期状態の設定
        this.setTraits(traits);
    }

    setTraits(traits){
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
        this.name = "";
        this.gender = "";
        this.job = "";
        this.imgUrl = "";
        this.status = null;
        this.traitsWrapper = null;

        //初期状態の設定
        this.setName("Unknown");
        this.setGender("male");
        this.setJob("hero");
        this.setImgUrl(this.gender, this.job);
        this.setStatus(new Status());
        this.setTraitsWrapper(new TraitsWrapper("everyman"));
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

//------------ViewModelの設計----------------
//VueインスタンスはViewModelそのもの
var vmGameMaker = new Vue({
    el: "#gameMaker",
    data: {
        person: new RPGCharacter(),
        genderArr: config.genderArr,
        jobArr: config.jobArr
    },
    computed: {
        imgUrl: function(){
            let gender = this.person.getGender();
            let job = this.person.getJob();

            this.person.setImgUrl(gender, job);
    
            return this.person.getImgUrl();
        },
        fetchStatusValue: function(){
            return function(species){
                let traitsWrapper = this.person.getTraitsWrapper();
                let status = this.person.getStatus();

                switch(species){
                    case "strength": return traitsWrapper.fetchStrengthWithStatus(status);
                    case "agility": return traitsWrapper.fetchAgilityWithStatus(status);
                    case "resilience": return traitsWrapper.fetchResilienceWithStatus(status);
                    case "wisdom": return traitsWrapper.fetchWisdomWithStatus(status);
                    case "luck": return traitsWrapper.fetchLuckWithStatus(status);
                }
                return 0;
            };
        },
        traitsArr: function(){
            let gender = this.person.getGender();
            let job = this.person.getJob();

            return TraitsReader.getTraitsArr(gender, job);
        }
    }
});