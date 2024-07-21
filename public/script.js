const textArea = document.getElementById("text_to_summarize");
const pasteSampleText = document.getElementById("paste-sample-text");
const submitBtn = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");
const copyText = document.getElementById("copy-text");
const copyButtonText = document.querySelector("#copy-text .submit-button-text");

textArea.addEventListener("input", verifyTextLength);
submitBtn.addEventListener("click", submitData);
copyText.addEventListener("click", copyTxt);
pasteSampleText.addEventListener("click", pasteSample);

submitBtn.disabled = true;
function verifyTextLength(e){
  const textArea = e.target;
  if (textArea.value.length > 200 && textArea.value.length < 100000) {
    submitBtn.disabled = false;
  }
  else{
    submitBtn.disabled = true;
  }
}

function pasteSample(event) {
  event.preventDefault();
  const sampleText = "Stephen Hawking was one of the most brilliant theoretical physicists of our time. Born on January 8, 1942, in Oxford, England, Hawking made groundbreaking contributions to our understanding of black holes and the nature of the universe. Despite being diagnosed with amyotrophic lateral sclerosis (ALS) at the age of 21, which left him almost completely paralyzed, he continued his research and wrote several best-selling books, including 'A Brief History of Time.' His work on Hawking radiation and the Big Bang theory revolutionized cosmology. Hawking's life was a testament to the power of intellect and perseverance, inspiring millions around the world.";
  textArea.value = sampleText;
  const sampleobj = { target: { value: sampleText } };
  verifyTextLength(sampleobj);
}

function copyTxt() {
  const text = summarizedTextArea.value;
  navigator.clipboard.writeText(text).then(() => {
    copyButtonText.textContent = "Copied!";
    copyText.classList.add("active");
    setTimeout(() => {
      copyButtonText.textContent = "Copy to Clipboard";
      copyText.classList.remove("active");
    }, 1500);
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
}

function sendEmail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;
  const share = document.getElementById("share-feedback").checked ? "Yes" : "No";

  if (name && email && message) {
    const params = { name, email, message, share };

    emailjs.send("service_bv41tq6", "template_u2yo78c", params)
      .then(alert("Email sent successfully!"))
      .catch((error) => alert("Failed to send email: " + error));

    return true;
  } 
  else {
    alert("Please fill all the fields!");
    return false;
  }
}

function submitData() {
  submitBtn.classList.add("submit-button--loading");
  const text_to_summarize = textArea.value;
  
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  
  fetch('/summarize', requestOptions)
    .then(response => response.text())
    .then(summary => {
      summarizedTextArea.value = summary;
      submitBtn.classList.remove("submit-button--loading");
    })
    .catch(error => {
      console.log(error.message);
    });
}