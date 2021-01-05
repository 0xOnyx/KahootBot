
const Kahoot = require("kahoot.js-updated");

const readline = require("readline")


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

let pin = false

let mode = {
    auto : (question)=>{ question.answer(Math.floor(Math.random() * 4)) },
    manuel: (question)=>{}
}

function game(){
    rl.question("PIN => ", (insert)=>{
        if( !(Number(insert) > 0) ){throw new Error("please enter a pin") }
        
        let tmp = new Kahoot()
        tmp.join(Number(insert), "Test" + Math.floor( Math.random() * 10))
        tmp.on("Joined", ()=>{
            pin = Number(insert)
                    
          tmp.on("QuestionStart", mode[arrayMode[0]])
        })
        





        let questionMode = "mode avaible => "
        let arrayMode = Object.keys(mode) 

        for(let i = 0; i < arrayMode.length; i++){
            questionMode += `   ${i} - ${arrayMode[i]}`
        }
        questionMode += "insert only number"

        rl.question(questionMode , (insert)=>{
            if( !(Number(insert) < arrayMode.length) ){throw new Error("out of rang") }
            let callback = mode[arrayMode[Number(insert)]]


            rl.question("Nombre of player =>", (insert)=>{
                if( !(Number(insert) > 0) ){throw new Error("min 1") }

                let playerArray = new Array(Number(insert))
                for(let i = 0; i < playerArray.length ; i++){
                    setTimeout(()=>{
                        playerArray[i] = new Kahoot()
                        playerArray[i].join(pin, "Test" + Math.floor( Math.random() * 20)+1),
                        playerArray[i].on("QuestionStart", callback)
                    }, 1200 * i)
                    
                
                }
                
                
            })

        })


    })    


}




try {
    game()
}
catch(e){
    //console.log(e)
}