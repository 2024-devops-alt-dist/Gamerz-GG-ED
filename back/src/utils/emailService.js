require("dotenv").config();
const nodemailer = require("nodemailer");

const emailTransporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});

exports.sendValidationEmail = async (email, username) => {
    try {
        const mailOptions = {
            from: `"Support Gamerz" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "🎮 Votre compte a été approuvé ✅",
            text: `🎉🔥 YOLOOO ${username} ! 🔥🎉

                🚀 ALERTE GAMING ULTIME ! 🚀

                ✨ Bonne nouvelle ! Ton compte sur Gamerz a été validé avec succès ! 🎮🎊

                Tu peux maintenant te connecter et dominer le game avec la commu’ ! 💪😎

                💾 Inventaire débloqué :
                ✅ Accès aux discussions 💬
                ✅ Partage de tes exploits 🏆
                ✅ Ragequit autorisé* (avec modération) 🎤💥
                
                🎮 Que la hype soit avec toi ! 🎮
                
                À très vite,  
                L’équipe Gamerz ⚡👾  
                
                PS : 🐱 La Bise au Chat (et aux gamers !) 🎮🐾`,
            html: `
  <div style="font-family: Arial, sans-serif; background-color: #121212; padding: 0; margin: 0;">
    <div style="max-width: 600px; margin: auto; background-color: #1e1e1e; border-radius: 12px; overflow: hidden; box-shadow: 0 0 20px rgba(255,102,0,0.3);">
      
      <div style="background-color: #ff6600; padding: 20px; text-align: center;">
        <h1 style="color: #fff; font-size: 26px; margin: 0;">🎮 Bienvenue chez Gamerz</h1>
      </div>

      <div style="padding: 30px; color: #f0f0f0;">
        <h2 style="font-size: 22px; margin-bottom: 10px;">🔥 YOLOOO ${username} !</h2>
        <p style="font-size: 16px; line-height: 1.6;">🚀 Ton compte a été <strong style="color: #00ff00;">approuvé</strong> ! Prépare-toi à rejoindre la commu’ et à tout déchirer 💪😎</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://gamerz-gg-ed.vercel.app/login" style="display: inline-block; background-color: #ff6600; color: #fff; padding: 14px 24px; border-radius: 8px; font-size: 16px; font-weight: bold; text-decoration: none;">
            🔐 Se connecter maintenant
          </a>
        </div>

        <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px;">
          <h3 style="color: #ffd700; margin-bottom: 10px;">💾 Inventaire débloqué :</h3>
          <ul style="list-style: none; padding: 0; font-size: 15px;">
            <li style="margin: 8px 0;">✅ Accès aux discussions 💬</li>
            <li style="margin: 8px 0;">✅ Partage de tes exploits 🏆</li>
            <li style="margin: 8px 0;">✅ Ragequit autorisé* (avec modération) 🎤💥</li>
          </ul>
        </div>

        <p style="font-size: 16px; margin-top: 30px;">À très vite,</p>
        <p style="font-size: 18px; color: #ff6600; font-weight: bold;">L’équipe Gamerz ⚡👾</p>
        <p style="font-size: 13px; color: #999999;">PS : 🐱 La Bise au Chat (et aux gamers !) 🎮🐾</p>
      </div>
    </div>
  </div>`,
        };

        await emailTransporter.sendMail(mailOptions);
        console.log(`✅ Email de validation envoyé à ${email}`);
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi de l'email :", error);
    }
};

exports.sendAdminNotificationOnRegister = async (userEmail, username) => {
    try {
        const mailOptions = {
            from: `"Gamerz Alert" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: `🆕 Nouvel utilisateur en attente : ${username}`,
            text: `Un nouvel utilisateur s'est inscrit sur Gamerz !

Nom d'utilisateur : ${username}
Email : ${userEmail}

Connecte-toi pour le valider.`,
            html: `
  <div style="font-family: Arial, sans-serif; background-color: #121212; padding: 0; margin: 0;">
    <div style="max-width: 600px; margin: auto; background-color: #1e1e1e; border-radius: 12px; overflow: hidden; box-shadow: 0 0 20px rgba(255,102,0,0.3);">
      
      <!-- Header -->
      <div style="background-color: #ff6600; padding: 20px; text-align: center;">
        <h1 style="color: #fff; font-size: 26px; margin: 0;">⚠️ Nouvelle Inscription Gamerz</h1>
      </div>

      <!-- Content -->
      <div style="padding: 30px; color: #f0f0f0;">
        <h2 style="font-size: 22px; margin-bottom: 10px;">🎮 Un nouveau challenger approche !</h2>

        <div style="background-color: #2a2a2a; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <p style="font-size: 16px;"><strong>👤 Nom d'utilisateur :</strong> <span style="color: #ffcc00;">${username}</span></p>
          <p style="font-size: 16px;"><strong>📧 Email :</strong> <span style="color: #ffcc00;">${userEmail}</span></p>
        </div>

        <p style="font-size: 16px; line-height: 1.6;">Ce joueur vient de s’inscrire et attend une <strong style="color: #00ff00;">validation</strong> par l’équipe admin. Prépare tes outils de modération !</p>

        <div style="text-align: center; margin: 30px 0;">
          <a href="https://gamerz-gg-ed.vercel.app/admin" style="display: inline-block; background-color: #00ff00; color: #000; padding: 14px 24px; border-radius: 8px; font-size: 16px; font-weight: bold; text-decoration: none;">
            🛠️ Accéder au panneau admin
          </a>
        </div>

        <p style="font-size: 14px; color: #999999; text-align: center;">Gamerz HQ © – Powered by passion and pixel dust</p>
      </div>
    </div>
  </div>`,
        };
        await emailTransporter.sendMail(mailOptions);
        console.log(`📧 Alerte admin envoyée pour ${userEmail}`);
    } catch (error) {
        console.error("❌ Erreur lors de l'envoi de l'alerte admin :", error);
    }
};
