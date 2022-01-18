let round = 0
let score = 0;
let correct_ = []
let finalRandomAnswers = []
const correctAnswerSound = new Audio("./tracks/Correct-sound-effect.mp3")
const wrongtAnswerSound = new Audio("./tracks/fail-buzzer-03.mp3")

//function to shuffle an array

function shuffleArray(array) {
    let curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
      // Pick a remaining element
      let randId = Math.floor(Math.random() * curId);
      curId -= 1;
      // Swap it with the current element.
      let tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }




function randomRange(v1, v2)
    { // min and max included 
        return Math.floor(Math.random() * (v2 - v1 + 1) + v1)
    }


 function startQuestion()
    {

        round+=1;
        document.getElementById("round").innerHTML = "Round: " + round
        document.getElementById("subButton").style.display = "block";

        document.getElementById("form").style.display = "inline-block";
        document.getElementById("btn").style.display = "none";
    
        
        let index =  randomRange(0, qQuestion.length-1); 
        let questionWithAnswers = qQuestion[index]; //get random question/its answer/wrong answers
        

        let question = questionWithAnswers[0] 
        let correctAnswer = questionWithAnswers[1]
        let wrongAnswers = questionWithAnswers[2];

        correct_.push(questionWithAnswers[1])  // we can have acces to it outside the function when we will have to compare the submited answer
        // console.log(correctAnswer)
        let allAnswers = [].concat([correctAnswer],wrongAnswers);
        //console.log(question)
        // console.log(allAnswers)
        let shuffledAnswers = shuffleArray(allAnswers) // shuffle the answers so we cant have always the correct answer on the first index
        
        //creating a div inside the form so we can remove it later 

        const divQuestion = document.createElement("div");
        divQuestion.setAttribute("id","divId")
        document.getElementById("form").appendChild(divQuestion)

        for (let i =0;i<shuffledAnswers.length;i++)
        {
            let id = "id"+i
            const br = document.createElement("br")
            const label = document.createElement("label")
            label.setAttribute("id", id);

            label.innerHTML = shuffledAnswers[i]
            const radioInput = document.createElement("INPUT");
            radioInput.value = shuffledAnswers[i]
            radioInput.setAttribute("type", "radio");
            radioInput.setAttribute("id", id);
            radioInput.setAttribute("name", "quiz")
            divQuestion.appendChild(radioInput)
            divQuestion.appendChild(label)
            divQuestion.appendChild(br)
        }


        document.getElementById("question").innerHTML = question 


    }



    function submitAnswer()
    {
        
        //console.log("pressed")

              
        const radioButtons = document.querySelectorAll('input[name="quiz"]');

        let selectedAnswer;
        for (const radioButton of radioButtons) 
            {
                if (radioButton.checked) 
                {
                    document.getElementById("divId").remove()
                    selectedAnswer = radioButton.value;
                    //console.log(selectedAnswer)
                    if(selectedAnswer == correct_[0])
                    {
                        document.getElementById("info").innerHTML = `Well Done the Answer is Correct: 
                        <br><span>${correct_[0]}</span>`
                        score+=1
                        correctAnswerSound.play()
                        document.getElementById("score").innerHTML = "Score: " + score
                    }
                    else
                    {document.getElementById("info").innerHTML = `Your Answer is Wrorng <br> the correct Answer is:<br> <span>${correct_[0]}</span>`
                    wrongtAnswerSound.play()
                    }
                    break;
                    
                }
            }


       

        
            
        
            // lets empty them again so we can go through the same process again 
            correct_.length = 0;
            finalRandomAnswers.length = 0;
            document.getElementById("question").innerText= ""
            document.getElementById("countDown").style.fontSize = "50px"
            document.getElementById("countDown").innerText= 3
            setTimeout(() => {document.getElementById("countDown").innerText= 2
                
            }, 1000);
                setTimeout(() => {document.getElementById("countDown").innerText= 1
                    
            }, 2000);
            
            setTimeout(() => {document.getElementById("countDown").innerText= ""
                
            }, 3000);

            document.getElementById("subButton").style.display = "none";


            setTimeout(() =>
             {
          
        
        
        document.getElementById("form").style.display = "none";
        document.getElementById("btn").style.display = "block";
        document.getElementById("btn").innerHTML = "Question nr " + Number(round+1);
        document.getElementById("info").innerText = ""
        

            }, 3000);
        if(typeof(document.getElementById("divId")) != 'undefined')
        // in case you submit without selection any radio input
        {
            document.getElementById("divId").remove()
            document.getElementById("info").innerText = "okay... \nYou skipped this question"

        }
    }



    