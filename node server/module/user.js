const mongoose =require('mongoose')
const bcrypt=require('bcrypt')

 

const userSchema =new mongoose.Schema({
    name:{
        required:true,
        type:String,
        lowercase :true,
        maxlength:25,
        trim:true,
        validate:{
            validator:v=> v.length <25,
            message: props=>`${props.value} name should be less than 25 charecter` 
        }
    },
    phone:{
        required:true,
        type:String,
        unique: true,
        dropDups: true,
        maxlength:10,
        maxlength:14,
    },
    role:{
          type: mongoose.Schema.ObjectId,
          ref: 'Role',
        },
    image:{
        type:String,
        default:"default",
    },
    statue:{
        type:String,
        default : "Hi there Im using SyriaBook"
    },
    password:{
        required:true,
        type:String
    },  
    gender:{
        required:true,
        type:String
    },
    address:{
        region:String,
        city:String
    },
    birthday:{
       type:Date
    },
    registerStep:{
        type:Number,
        default:0
    },
    createdAt:{
        type:Date,
        default:()=> Date.now(),
        immutable:true
    },
    updatedAt:{
        type:Date,
        default:()=> Date.now()
    }
})

userSchema.methods.sayHi = function(){
    console.log(`hi , my name is ${this.name}`)
}
userSchema.statics.findByName=function(name){
    return this.find({name:new RegExp(name,'i')})
}
userSchema.query.byName=function(name){
    return this.where({name:new RegExp(name,'i')})
}
userSchema.virtual("namedPhone").get(function(){
    return `${this.name} <${this.phone}>`
})

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

 

userSchema.pre('save',function(next){
    this.updatedAt= Date.now()
    next()
})

module.exports=mongoose.model("User",userSchema)







