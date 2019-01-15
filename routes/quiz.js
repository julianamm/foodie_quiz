const express = require('express');
const router = express.Router();

// GET /
// welcome page
router.get('/', (req, res) => {
  res.render("welcome");
});

const COOKIE_AGE = 1000 * 60 * 60 * 24 * 7;

router.post("/form_welcome", (req, res) => {
  const name = req.body.name.toLowerCase();
  const uppercaseName = name.charAt(0).toUpperCase() + name.slice(1);;

  if(uppercaseName) {
    res.cookie("name", uppercaseName, { maxAge: COOKIE_AGE });
    res.redirect("/quiz");
  } else {
    res.render("welcome");
  }
});

// GET /quiz
router.get('/quiz', (req, res) => {
  res.render("quiz", {cookie_name: req.cookies.name });
});


// POST /quiz
router.post("/quiz", (req, res) => {
  console.log('//////', req.body);
  const answer1 = req.body.qt1;
  const answer2 = req.body.qt2;
  const answer3 = req.body.qt3;
  const answer4 = req.body.qt4;
  const answer5 = req.body.qt5;
  const answer6 = req.body.qt6;
  const answer7 = req.body.qt7;
  const answer8 = req.body.qt8;
  const answer9 = req.body.qt9;
  const answer10 = req.body.qt10;
  let score = 0;
  // res.json(answer1); 
  // res.json(answer2);

  
    if(answer1 === "opt1") {
      score += 1;
    } 
    if(answer2 === "opt1") {
      score += 1;
    }
    if(answer3 === "opt2") {
      score += 1;
    }
    if(answer4 === "opt1") {
      score += 1;
    }
    if(answer5 === "opt2") {
      score += 1;
    }
    if(answer6 === "opt1") {
      score += 1;
    }
    if(answer7 && answer7[0] == 'opt1' && answer7[1] == 'opt2' && answer7[2] == 'opt4'){
      score += 1;
    }
    if(answer8 && answer8[0] == 'opt2' && answer8[1] == 'opt3'){
      score += 1; 
    }
    if(answer9 && answer9[0] == 'opt3' && answer9[1] == 'opt4'){
      score += 1;
    }
    if(answer10 && answer10[0] == 'opt1' && answer10[1] == 'opt4'){
      score += 1;
    }    
  
  const percent_score = (score/10)*100;
  let grade = "";
  
  if (score >= 9) {
    grade = "🌟 🌟 🌟 🌟 🌟  You nailed it!";
  } else if (score >= 7 && score < 9) {
    grade = "⭐️ ⭐️ ⭐️ ⭐️  You're a rock star!"
  } else if (score >= 5 && score < 7) {
    grade = "⭐️ ⭐️ ⭐️  Great job!"
  } else if (score >= 3 && score < 5) {
    grade = "⭐️ ⭐️ Good try"
  } else if (score >= 1 && score < 2) {
    grade = "⭐️  Awn I'm sure you'll do better next time."
  } else {
    grade = "😣 Awn I'm sure you'll do better next time."
  }
  
  let all_results = { score, percent_score, grade }

  // const final_score = ;
  res.cookie("resultCookie", all_results, { maxAge: COOKIE_AGE });
  res.redirect('/quiz/result');
});

// GET /quiz/result
router.get('/quiz/result', (req, res) => {
  res.render("result", { finalResults: req.cookies.resultCookie, cookie_name: req.cookies.name });
});


module.exports = router;
