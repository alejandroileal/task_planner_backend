import { createTransporter, config } from "../config/config.js";

const createWelcomeEmail = (name) => {
  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bienvenido a Devotion</title>
    <style>
      body {
        background-color: #ffffff;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: #333333;
        margin: 0;
        padding: 0;
        text-align: center;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 40px 20px;
      }

      .logo {
        width: 40px;
        margin-bottom: 20px;
      }

      h1 {
        font-weight: 600;
        font-size: 24px;
        margin-bottom: 10px;
      }

      p {
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 30px;
      }

      .btn {
        background-color: #b3ecff;
        color: #000000;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 6px;
        font-weight: 500;
        display: inline-block;
        transition: background-color 0.2s ease;
      }

      .btn:hover {
        background-color: #9de6ff;
      }

      .footer {
        margin-top: 40px;
        font-size: 12px;
        color: #888888;
      }
    </style>
  </head>
  <body>
    <div class="container">
     
      <h1>¡Bienvenido a Devotion, ${name}!</h1>
      <p>
        Gracias por unirte. Estamos emocionados de acompañarte en tu camino
        hacia una vida más organizada y enfocada. <br />
        <strong>Planéalo. Lógralo.</strong>
      </p>
      <a href="http://localhost:5500" class="btn">Ir a mi cuenta</a>

      <div class="footer">
        Si no creaste esta cuenta, ignora este mensaje.
        <br />
        © 2025 Devotion. Todos los derechos reservados.
      </div>
    </div>
  </body>
</html>`;
};

export const sendWelcomeEmail = async (data) => {
  const { name, email } = data;
  const transporter = createTransporter();

  const mailOptions = {
    from: config.EMAIL_USER,
    to: email,
    subject: `¡Hola ${name}, ya eres parte de Devotion!`,
    html: createWelcomeEmail(name),
    text: `Hola ${name},\n\nGracias por registrate.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email enviado: " + info.response);
    return { success: true, message: "Correo enviado exitosamente." };
  } catch (error) {
    console.error("Error al enviar el email:", error);
    return { success: false, error: "Error al enviar el correo." };
  }
};
