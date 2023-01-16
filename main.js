$(document).ready(function(){
    let questions = [
        ["Tell me how you’d check that the brakes are working before starting a journey.", 0],
        ["Tell me where you'd find the information for the recommended tyre pressures for this car and how tyre pressures should be checked.", 1],
        ["Tell me how you make sure your head restraint is correctly adjusted so it provides the best protection in the event of a crash", 2],
        ["Tell me how you'd check the tyres to ensure that they have sufficient tread depth and that their general condition is safe to use on the road.",3],
        ["Tell me how you'd check that the headlights and tail lights are working. You dont need to exit the vehicle.",4],
        ["Tell me how you'd know if there was a problem with your anti-lock braking system.",5],
        ["Tell me how you'd check the direction indicators are working. You dont need to exit the vehicle.",6],
        ["Tell me how you'd check the brake lights are working on this car.",7],
        ["Tell me how you'd check the power-assisted steering is working before starting a journey. If the steering becomes heavy, the system may not be working properly. Before starting a journey, 2 simple checks can be made.",8],
        ["Tell me how you'd switch on the rear fog light(s) and explain when youd use it/them. You dont need to exit the vehicle.",9],
        ["Tell me how you switch your headlight from dipped to main beam and explain how youd know the main beam is on.",10],
        ["Open the bonnet and tell me how you'd check that the engine has sufficient oil.",11],
        ["Open the bonnet and tell me how you'd check that the engine has sufficient engine coolant.",12],
        ["Open the bonnet and tell me how you'd check that you have a safe level of hydraulic brake fluid.",13]
    ];
    let answers = [
        "Brakes should not feel spongy or slack. Brakes should be tested as you set off. Vehicle should not pull to one side.",
        "Manufacturer’s guide, use a reliable pressure gauge, check and adjust pressures when tyres are cold, don’t forget spare tyre, remember to refit valve caps.",
        "The head restraint should be adjusted so the rigid part of the head restraint is at least as high as the eye or top of the ears, and as close to the back of the head as is comfortable. Note: Some restraints might not be adjustable.",
        "No cuts and bulges, 1.6mm of tread depth across the central three-quarters of the breadth of the tyre, and around the entire outer circumference of the tyre.",
        "Explain you’d operate the switch (turn on ignition if necessary), then walk round vehicle (as this is a ‘tell me’ question, you don’t need to physically check the lights).",
        "Warning light should illuminate if there is a fault with the anti-lock braking system.",
        "Explain you’d operate the switch (turn on ignition if necessary), and then walk round vehicle (as this is a ‘tell me’ question, you don’t need to physically check the lights).",
        "Explain you’d operate the brake pedal, make use of reflections in windows or doors, or ask someone to help.",
        "If the steering becomes heavy, the system may not be working properly. Before starting a journey, 2 simple checks can be made. Gentle pressure on the steering wheel, maintained while the engine is started, should result in a slight but noticeable movement as the system begins to operate. Alternatively turning the steering wheel just after moving off will give an immediate indication that the power assistance is functioning.",
        "Operate switch (turn on dipped headlights and ignition if necessary). Check warning light is on. Explain use.",
        "Operate switch (with ignition or engine on if necessary), check with main beam warning light.",
        "Identify dipstick/oil level indicator, describe check of oil level against the minimum and maximum markers.",
        "Identify high and low level markings on header tank where fitted or radiator filler cap, and describe how to top up to correct level.",
        "Identify reservoir, check level against high and low markings."
    ];
    let qBox = $("#question-box");
    let aBox = $("#answer-box");
    let end = $("#end");
    let aBox1 = $("#ans1");
    let aBox2 = $("#ans2");
    let aBox3 = $("#ans3");
    let array = [0,1,2,3,4,5,6,7,8,9,10,11,12,13];
    let counter = 0;
    let answer;
    let randArr = [];
    let answerClass = $('.answer');
    let answerArray = [];
    let restart = $("#restart");
    let Qcount = 1;
    let counterVal = $("#counterVal");
    end.hide();
    array.sort(() => { //randomise ordering of question
      const randomTrueOrFalse = Math.random() > 0.5;
      return randomTrueOrFalse ? 1 : -1
    });

    counterVal.append('<p class="CounterValue">' + Qcount + '/14</p>')
    qBox.html(questions[array[counter]][0]); //output first question
    answer = questions[array[counter]][1]; //get answer to first question
    populateAnswerBoxes(answer); //set answers for first question

    restart.click(function() { //restart
        restartAll();
    });

    answerClass.click(function() {
        answerArray.push([questions[array[counter]], $(this).attr("myval")]);
        nextQ($(this));
        counter++;
    });

    function nextQ(element) {
        Qcount++;
        counterVal.children().remove();
        counterVal.append('<p class="CounterValue">' + Qcount + '/14</p>')
        isCorrect(element, element.attr("myval"), questions[array[counter]][1]);
        answer = questions[array[counter]][1];

        if(counter == 13) {
            qBox.hide();
            aBox.hide();
            counterVal.hide();
            populateEndScreen();
            end.show();
        } else {
            qBox.html(questions[array[counter]][0]);
            populateAnswerBoxes(questions[array[counter]][1]);
        }
    }

    function populateAnswerBoxes(answer) {
        randArr = [];
        while(randArr.length < 2) {
            let x = Math.floor((Math.random() * 14));
            if(x != answer) {
                if($.inArray(x, randArr) == -1) {
                    randArr.push(x);
                }
            }
        }
        randArr.push(answer);

        randArr.sort(() => {
            const randomTrueOrFalse = Math.random() > 0.5;
            return randomTrueOrFalse ? 1 : -1
        });

        $.each(randArr, function(index, value) {
            if(index == 0) {
                aBox1.html(answers[value]);
                aBox1.css("background-color", "transparent");
                if(value == answer) {
                    aBox1.attr('myval',answer);
                } else {
                    aBox1.attr('myval',value);
                }
            };
            if(index == 1) {
                aBox2.html(answers[value]);
                aBox2.css("background-color", "transparent");
                if(value == answer) {
                    aBox2.attr('myval',answer);
                } else {
                    aBox2.attr('myval',value);
                }     
            };
            if(index == 2) {
                aBox3.html(answers[value]);
                aBox3.css("background-color", "transparent");
                if(value == answer) {
                    aBox3.attr('myval',answer);
                } else {
                    aBox3.attr('myval',value);
                }
            };
        });
    }

    function isCorrect(element, chosen, answer) {
        if(chosen == answer) {
            element.css("background-color", "green");
        } else {
            element.css("background-color", "red");
        }
    }

    function populateEndScreen() {
        $('.bigc').css("top", "5%");
        let acount = 1;
        let corCount = 0;
        $.each(answerArray, function(index, value) {
            if(value[0][1] == value[1]) {
                corCount++;
            }
        });
        end.append('<p id="score">Your score: <span>'+ corCount +'/14</span></p>');
        end.append('<hr>');

        $.each(answerArray, function(index, value) {
            if(value[0][1] == value[1]) {
                end.append('<p class="correct" >Question ' + acount + ': ' + value[0][0] + '</p>');
                end.append('<p class="given">Answer given: ' + answers[value[1]] + '</p>');
                corCount++;
            } else {
                end.append('<p class="incorrect" >Question ' + acount + ': (' + value[0][0] + '</p>');
                end.append('<p class="given" >Answer given: ' + answers[value[1]] + '</p>');
                end.append('<p class="right" >Correct answer: ' + answers[value[0][1]] + '</p>')
            }
            end.append('<hr>');
            acount++;
        });
        
    }

    function restartAll() {
        $('.bigc').css("top", "20%");
        array.sort(() => {
            const randomTrueOrFalse = Math.random() > 0.5;
            return randomTrueOrFalse ? 1 : -1
        });
        Qcount = 1;
        answerArray = [];
        counter = 0;
        qBox.html(questions[array[counter]][0]);
        answer = questions[array[counter]][1];
        counterVal.children().remove();
        counterVal.append('<p class="CounterValue">' + Qcount + '/14</p>')
        populateAnswerBoxes(answer);
        qBox.show();
        aBox.show();
        counterVal.show();
        end.children().remove();
        end.append('<div class="restart-cont"><button id="restart">Restart?</button></div>');
        end.hide();
    }

});