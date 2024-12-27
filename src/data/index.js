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
  { placeholder: "", icon: textBubble, type: "Bubble" },
  { placehoder: "", icon: imgBubble, type: "Image" },
];

const inputLabels = [
  { placeholder: "Enter your text", icon: textIcon, type: "Text" },
  { placeholder: "Enter a number", icon: numberIcon, type: "Number" },
  { placeholder: "Enter your email", icon: emailIcon, type: "Email" },
  { placeholder: "Enter your phone", icon: phoneIcon, type: "Phone" },
  { placeholder: "Select a date", icon: dateIcon, type: "Date" },
  { placeholder: "Select rating", icon: ratingIcon, type: "Rating" },
  { placeholder: "", icon: buttonIcon, type: "Buttons" },
];

export { bubbleLabels, inputLabels };
