const { transporter } = require('../../config/mail-transporter')
const { o2switch } = require('../../config/dot-env')

exports.sendCivilMailConfirmation = async (req, res) =>{
    try{
        const { 
            firstname, 
            lastname, 
            email, 
            isPresent,
            loinclothes,
            message,
            companions
        } = req.body;

        let finalMessage='';

        let willBePresentOrNot = ( isPresent === 'Oui' ) ? 'Oui, je serais présent' : 'Non, je ne serais pas présent';

        let willHaveLoinclothOrNot;
        let pagnes='';

        if(loinclothes?.length > 0 ){
            willHaveLoinclothOrNot = 'Oui, je veux un/des pagne(s)';

            loinclothes.forEach(loincloth => {
                if(loincloth.quantity > 0){
                    pagnes += "\n--> Pagne "+loincloth.familly+" : "+loincloth.quantity
                }
            });

            pagnes += "\n\n"+"Adresse de livraison : "+loinclothes[0].deliveryAdress

        }else{
            willHaveLoinclothOrNot = 'Non, je ne prendrais pas de pagne';
        }

        let allCompanions='';
        let companionsNumber = 0;
        if(companions){
            if(companions.length > 0) {
                companions.forEach(companion => {
    
                    allCompanions += "\n--> "+companion.type+" "+companion.firstname+" "+companion.lastname
                })
    
                companionsNumber = companions.length;
            }
        }



        finalMessage += willBePresentOrNot;

        if(isPresent === "Oui"){
            finalMessage += "\n\n"+willHaveLoinclothOrNot
            if(pagnes){
                finalMessage += "\n"+pagnes
            }
        }

        if(companionsNumber > 0){
            finalMessage += "\n\nJe souhaite avoir : "+companionsNumber+" personne(s) qui m'accompagne(nt)";
            finalMessage += "\n"+allCompanions;
        }

        if(message){
            finalMessage += "\n\nMessage pour les mariés :"+"\n\n"+message
        }

        finalMessage += "\n\n"+firstname+" "+lastname+ "\n"+email;;

        const object = "Confirmation mariage civil | "+firstname+" "+lastname;

        const info = await transporter.sendMail(
            {
                from: o2switch.router,
                to: o2switch.receiver,
                subject: object,
                text: finalMessage
            }
        );

        if(isPresent === 'Non'){
            return res.status(201).json({
                status : "success",
                message:"Votre message a bien été envoyé."
            })
        }

        return res.status(201).json({
            status : "success",
            message:"Votre présence pour le mariage civil a bien été confirmée."
        })

    } catch (e){
        return res.status(500).json(
            {
                status : "error",
                message : "Erreur lors de l'envois. Vous pouvez re-essayer plus tard et si cela persite contactez nous directement via la page de contact"
            }
        )
    }

}

exports.sendReligiousMailConfirmation = async (req, res) =>{

    try{
        const { 
            firstname, 
            lastname, 
            email, 
            isPresent,
            message,
            companions
        } = req.body;

        let finalMessage='';

        let willBePresentOrNot = ( isPresent === 'Oui' ) ? 'Oui, je serais présent' : 'Non, je ne serais pas présent';

        let allCompanions='';
        let companionsNumber = 0;
        if(companions?.length > 0) {
            companions.forEach(companion => {

                allCompanions += "\n--> "+companion.type+" "+companion.firstname+" "+companion.lastname
            })

            companionsNumber = companions.length;
        }

        finalMessage += willBePresentOrNot;

        if(companionsNumber > 0){
            finalMessage += "\n\nJe souhaite avoir : "+companionsNumber+" personne(s) qui m'accompagne(nt)";
            finalMessage += "\n"+allCompanions;
        }

        if(message){
            finalMessage += "\n\nMessage pour les mariés :"+"\n\n"+message
        }

        finalMessage += "\n\n"+firstname+" "+lastname+ "\n"+email;;

        const object = "Confirmation mariage réligieux | "+firstname+" "+lastname;

        const info = await transporter.sendMail(
            {
                from: o2switch.router,
                to: o2switch.receiver,
                subject: object,
                text: finalMessage
            }
        );

        if(isPresent === 'Non'){
            return res.status(201).json({
                status : "success",
                message:"Votre message a bien été envoyé."
            })
        }

        return res.status(201).json({
            status : "success",
            message:"Votre présence pour le mariage réligieux a bien été confirmée."
        })

    } catch (e){
        return res.status(500).json(
            {
                status : "error",
                message : "Erreur lors de l'envois. Vous pouvez re-essayer plus tard et si cela persite contactez nous directement via la page de contact"
            }
        )
    }

}