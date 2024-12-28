import {
  textBubble,
  textIcon,
  imgBubble,
  dateIcon,
  numberIcon,
  emailIcon,
  phoneIcon,
  ratingIcon,
  buttonIcon,
} from "../assets/icons";

const bubbleLabels = [
  { placeholder: "", icon: textBubble, type: "bubble", label: "Text" },
  { placehoder: "", icon: imgBubble, type: "image", label: "Image" },
];

const inputLabels = [
  { placeholder: "Enter your text", icon: textIcon, type: "text", label: "Text" },
  { placeholder: "Enter a number", icon: numberIcon, type: "number", label: "Number" },
  { placeholder: "Enter your email", icon: emailIcon, type: "email", label: "Email" },
  { placeholder: "Enter your phone", icon: phoneIcon, type: "tel", label: "Phone" },
  { placeholder: "Select a date", icon: dateIcon, type: "date", label: "Date" },
  { placeholder: "Select rating", icon: ratingIcon, type: "rating", label: "Rate" },
  { placeholder: "", icon: buttonIcon, type: "submit", label: "Buttons" },
];

export { bubbleLabels, inputLabels };
