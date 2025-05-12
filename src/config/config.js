import nodemailer from "nodemailer";

export const config = {
  PORT: 3000,
  EMAIL_USER: "aleal1202@gmail.com",
  EMAIL_PASS: "minekaccyjhovtbf",
};

export const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS,
    },
  });
};
