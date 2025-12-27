const questions = [
  {q:"The major categories of hematological disorders in pregnancy include thromboembolism, DIC, and anemia.", a:true},
  {q:"Anemia in pregnancy is defined as an increase in hemoglobin percentage or hematocrit.", a:false},
  {q:"Hematocrit value approximates hemoglobin percentage multiplied by three.", a:true},
  {q:"Maternal complications of anemia include abortion, preterm labour, APH, uterine inertia, PPH, and puerperal sepsis.", a:true},
  {q:"Fetal complications of maternal anemia include IUGR, IUFD, prematurity, and increased perinatal morbidity.", a:true},
  {q:"Clinical features of anemia include asthenia, blurred vision, cold extremities, dyspnea, and easy fatigue.", a:true},
  {q:"Hyperdynamic circulation in anemia may present with tachypnea and tachycardia.", a:true},
  {q:"Iron deficiency anemia is the least common pathological anemia in pregnancy.", a:false},
  {q:"The McFee concept suggests women are frequently iron deficient before pregnancy regardless of socioeconomic status.", a:true},
  {q:"Increased iron requirements during pregnancy contribute to iron deficiency unless supplementation is given.", a:true},
  {q:"Etiological factors of iron deficiency anemia include decreased intake, absorption, and increased requirements.", a:true},
  {q:"Iron deficiency anemia diagnosis includes low hemoglobin, low MCV, and decreased serum iron.", a:true},
  {q:"Dietary iron sources include liver, meat, and green vegetables.", a:true},
  {q:"Oral iron should always be given on an empty stomach without risk of GI irritation.", a:false},
  {q:"Ferrous salts are better absorbed than ferric salts.", a:true},
  {q:"Curative oral iron therapy recommends ferrous salt three times daily for mild anemia.", a:true},
  {q:"Parenteral iron options include Imferon, Jectofer, and Ferosac.", a:true},
  {q:"Parenteral iron is indicated in malabsorption, intolerance to oral iron, or Hb < 8 g/dL late in pregnancy.", a:true},
  {q:"Precautions of parenteral iron include anaphylaxis, injection pain, abscess, acute pylitis, and hemosiderosis.", a:true},
  {q:"Blood transfusion using packed red blood cells is an option in anemia treatment.", a:true},
  {q:"Macrocytic anemia in pregnancy is mainly due to folic acid or vitamin B12 deficiency.", a:true},
  {q:"Pernicious anemia is caused by absence of intrinsic factor leading to poor B12 absorption.", a:true},
  {q:"Macrocytic anemia is associated with decreased MCV.", a:false},
  {q:"Folate deficiency prophylaxis includes folate-rich diet and folic acid tablets.", a:true},
  {q:"Curative treatment of folate deficiency is oral folic acid.", a:true},
  {q:"DIC is defined as accelerated coagulation with consumption of clotting factors and secondary fibrinolysis.", a:true},
  {q:"DIC mechanism involves thromboplastin release, fibrin formation, and secondary clot lysis.", a:true},
  {q:"Concealed accidental hemorrhage is the commonest cause of DIC.", a:true},
  {q:"Causes of DIC include PIH, amniotic fluid embolism, septic abortion, IUFD, infections, and placental causes.", a:true},
  {q:"Bedside tests for DIC include bleeding time, clotting time, thrombin time, and Weiner test.", a:true},
  {q:"In DIC, bleeding time and clotting time are decreased.", a:false},
  {q:"In the Weiner test, DIC shows delayed clotting and rapid clot lysis.", a:true},
  {q:"Laboratory findings in DIC include prolonged PT, low platelets, low fibrinogen, and high FDP.", a:true},
  {q:"Treatment of DIC follows the 4F approach: fresh blood, plasma, fibrinogen, and fibrinolytic inhibitors.", a:true},
  {q:"Virchow’s triad includes circulatory stasis, vascular damage, and hypercoagulability.", a:true},
  {q:"Risk factors for DVT include smoking, obesity, hypertension, cesarean delivery, dehydration, and infection.", a:true},
  {q:"Pulmonary embolism complicates 50% of DVT cases and has a maternal mortality of about 30%.", a:false},
  {q:"DVT may be asymptomatic and typically presents post-operatively with leg pain, edema, fever, and Homan’s sign.", a:true},
  {q:"Superficial venous thrombosis cannot be clinically differentiated from DVT alone.", a:false},
  {q:"Doppler ultrasound is a rapid, safe, and preferred tool for diagnosing DVT in pregnancy.", a:true},
  {q:"Duplex and color Doppler are accurate modalities for DVT diagnosis.", a:true},
  {q:"Ascending venography is not mentioned as a diagnostic tool.", a: false},
  {q:"Post-operative passive leg exercises help reduce DVT risk.", a:true},
  {q:"Prophylactic anticoagulants may be used in high-risk pregnant patients.", a:true},
  {q:"Active treatment of DVT includes bed rest initially followed by mobilization and anticoagulants.", a:true}
];

let index=0;
let answered=false;
let results=[];

const qText=document.getElementById("questionText");
const counter=document.getElementById("counter");
const trueBtn=document.getElementById("trueBtn");
const falseBtn=document.getElementById("falseBtn");
const nextBtn=document.getElementById("nextBtn");
const retryBtn=document.getElementById("retryBtn");
const qList=document.getElementById("questionsList");

function toggleMenu(){
  const m=document.getElementById("sideMenu");
  const o=document.getElementById("overlay");
  if(m.style.right==="0px"){m.style.right="-250px";o.style.display="none";}
  else{m.style.right="0";o.style.display="block";}
}

function startQuiz(){
  shuffle();
  index=0;
  results=Array(questions.length).fill(null);
  document.getElementById("home").style.display="none";
  document.getElementById("quiz").style.display="block";
  document.querySelector(".options").style.display="flex";
  document.getElementById("questionsBtn").style.display="block";
  retryBtn.style.display="none";
  loadQuestion();
}

function loadQuestion(){
  answered=false;
  trueBtn.style.background="#3498db";
  falseBtn.style.background="#3498db";
  nextBtn.style.display="none";
  counter.innerText=`Question ${index+1} / ${questions.length}`;
  qText.innerText=questions[index].q;
}

function answer(val){
  if(answered) return;
  answered=true;
  const correct=questions[index].a;
  results[index]=(val===correct);

  if(val===correct){
    (val?trueBtn:falseBtn).style.background="#27ae60";
  }else{
    (val?trueBtn:falseBtn).style.background="#e74c3c";
    (correct?trueBtn:falseBtn).style.background="#27ae60";
  }

  if(results.every(r=>r!==null)){
    finishQuiz();
  }else{
    nextBtn.style.display="inline-block";
  }
}

function nextQuestion(){
  index = results.findIndex((r,i)=>r===null && i>index);
  if(index===-1){
    index = results.findIndex(r=>r===null);
  }
  loadQuestion();
}

function finishQuiz(){
  qText.innerText=`✅ Finished — Score: ${results.filter(r=>r).length} / ${questions.length}`;
  document.querySelector(".options").style.display="none";
  document.getElementById("questionsBtn").style.display="none";
  nextBtn.style.display="none";
  retryBtn.style.display="inline-block";
}

function retryQuiz(){
  startQuiz();
}

function toggleQuestions(){
  qList.innerHTML="";
  qList.style.display=qList.style.display==="block"?"none":"block";
  results.forEach((r,i)=>{
    const d=document.createElement("div");
    d.className="q-item "+(r===true?"correct":r===false?"wrong":"unanswered");
    d.innerText=i+1;
    d.onclick=()=>{
      index=i;
      loadQuestion();
      qList.style.display="none";
    };
    qList.appendChild(d);
  });
}

function shuffle(){
  questions.sort(()=>Math.random()-0.5);
}
