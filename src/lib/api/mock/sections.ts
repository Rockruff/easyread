import { Section } from "../sections";
import docs from "./docs";

const sections: Section[] = [
  {
    text: "Intelife wants to hear from you.",
    image:
      "https://images.unsplash.com/photo-1521791055366-0d553872125f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "You can give feedback or make a complaint.",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    text: "You do not have to give your name.",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "This includes clients, staff, and people with disability.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "Your feedback helps us improve our services.",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    text: "We follow NDIS rules to keep services safe and fair.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "We handle all complaints quickly and fairly.",
    image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    text: "We will tell you what is happening with your complaint.",
    image:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "You can ask someone to help you speak up.",
    image: "https://images.pexels.com/photos/6647904/pexels-photo-6647904.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    text: "Staff learn how to support you with complaints every year.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "Complaints help us protect your rights.",
    image: "https://images.pexels.com/photos/6647903/pexels-photo-6647903.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    text: "They help stop harm or unfair treatment.",
    image:
      "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    text: "You can contact Intelife or the NDIS Commission.",
    image: "https://images.pexels.com/photos/8296988/pexels-photo-8296988.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    text: "We will listen to you.",
    image:
      "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
].map(({ text, image }, index) => {
  return {
    doc_id: docs[0].id,
    id: String(index),
    order: index,
    text,
    image,
    candidates: [
      image,
      "https://placehold.co/600x400?text=Candidate 2",
      "https://placehold.co/600x400?text=Candidate 3",
      "https://placehold.co/600x400?text=Candidate 4",
      // "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=150&amp;h=100&amp;fit=crop",
      // "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150&amp;h=100&amp;fit=crop",
      // "https://images.unsplash.com/photo-1552664730-d307ca884978?w=150&amp;h=100&amp;fit=crop",
      // "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=150&amp;h=100&amp;fit=crop",
    ],
  };
});

export default sections;
