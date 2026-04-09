const form = document.getElementById("waitlist");
const message = document.getElementById("msg");

if (form && message) {
	const hasEmailJs = typeof emailjs !== "undefined";
	const publicKey = "YOUR_PUBLIC_KEY";
	const serviceId = "YOUR_SERVICE_ID";
	const templateId = "YOUR_TEMPLATE_ID";

	if (hasEmailJs && publicKey !== "YOUR_PUBLIC_KEY") {
		emailjs.init(publicKey);
	}

	form.addEventListener("submit", function (e) {
		e.preventDefault();

		const emailInput = form.querySelector('input[type="email"]');
		const email = emailInput ? emailInput.value.trim() : "";

		if (!email) {
			message.textContent = "Merci de renseigner une adresse e-mail valide.";
			return;
		}

		if (!hasEmailJs || publicKey === "YOUR_PUBLIC_KEY" || serviceId === "YOUR_SERVICE_ID" || templateId === "YOUR_TEMPLATE_ID") {
			message.textContent = "Configure EmailJS dans script.js pour recevoir les inscriptions par e-mail.";
			return;
		}

		emailjs.send(serviceId, templateId, {
			email: email,
			subject: "Nouvelle inscription liste d'attente",
			page: "shop_didy / index.html"
		})
			.then(function () {
				message.textContent = "Merci ! Vous êtes sur la liste d'attente.";
				form.reset();
			})
			.catch(function (error) {
				console.error(error);
				message.textContent = "Erreur lors de l'inscription. Réessayez dans un instant.";
			});
	});
}