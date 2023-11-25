export function formatEmail(subject) {
    const time = new Date();
    return `
    <!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <style>
            * {
                color: #000;
            }
    
            body {
                background-color: #fff !important;
            }
    
            .main-div {
                margin: 1% auto 2%;
                width:90%;
                background-color: #f7f7f7 !important;
                box-shadow: 2px 2px 10px #dedede !important;
                border-radius: 7px !important;
                padding: 1% 2%;
                text-align: left !important;
                font-size: 20px;
            }

            .name{
                text-transform: uppercase !important;
                font-weight: bold !important;
                color: #007aff !important;
            }
    
            .bict-link{
                margin-top: 2%;
                width: 20%;
                height: 10%;
                text-decoration: none;
            }
    
            .bict-logo-email {
                width: 20%;
                height: 20%;
                margin-left: 40% !important;
            }
    
            .ticket-description {
                margin: 3% 1% 10%;
            }
    
            .customer-support {
                margin-bottom: 10%;
            }
    
            .motto {
                margin-top: 5%;
            }
    
            .social-container {
                width: 100%;
                margin: 0 auto;
                text-align: center;
            }
    
            .social-icons {
                padding: 0;
                list-style: none;
                margin: 1em;
            }
    
            .social-icons>li {
                display: inline-block;
                margin: 0.15em 4%;
                position: relative;
                font-size: 0.5em;
            }
    
            .social-icons>li>a>img {
                color: #fff;
                position: absolute;
                top: 21px;
                left: 21px;
                margin: -10% -5%;
                height: 40px;
                width: 40px;
                transition: all 265ms ease-out;
            }
    
            .centered {
                text-align: center !important;
            }
    
            .social-icons>li>a {
                display: inline-block;
            }
    
            .social-icons>li>a::before {
                content: " ";
                width: 35px;
                height: 35px;
                border-radius: 100%;
                display: block;
                background: linear-gradient(45deg, #212121, #010714);
            }
    
            .social-icons>li>a:hover i {
                color: #00B5F5;
            }
    
            @media only screen and (max-width: 600px) {
                .main-div {
                    width: 90%;
                }
            }
    
            @media only screen and (min-width:601px) and (max-width: 1100px) {
                .main-div {
                    width: 70%;
                }
            }
        </style>
    
    </head>
    
    <body>
        <div class="main-div">
            <div class="ticket-description">
                <p>${subject}</p>
            </div>
            <a href="https://cybersecuritymeetup.rw/" class="bict-link"><img src="https://cybersecuritymeetup.rw/assets/Logo.7fcc3e1b.png" class="bict-logo-email"
                    alt="bict-logo"></a>
            <div class="customer-support motto">
                <p class="centered name">Cybersecurity Meetup Rwanda Team</p>
                <p class="centered">+250788358753</p>
                <p class="centered">meetupkigali@gmail.com</p>
            </div>
            <div class="social-container">
                <ul class="social-icons">
                    <li><a href="https://web.facebook.com/BroadcastersOfICT"><img
                                src="https://img.icons8.com/ios-filled/344/facebook-new.png" alt="social-media"></a></li>
                    <li><a href="https://twitter.com/bictrwanda"><img src="https://img.icons8.com/ios-filled/344/twitter.png"
                                alt="social-media"></a></li>
                    <li><a href="https://www.instagram.com/bict_rwanda/"><img
                                src="https://img.icons8.com/ios-glyphs/344/instagram-new.png" alt="social-media"></a></li>
                    <li><a href="https://www.linkedin.com/company/broadcasters-of-ict"><img
                                src="https://img.icons8.com/ios-glyphs/344/linkedin.png" alt="social-media"></a></li>
                </ul>
            </div>
            <div class="customer-support motto">
                <p class="centered">&copy; Copyright ${time.getFullYear()} Cybersecurity Meetup Rwanda Team</p>
            </div>
        </div>
    </body>
    
    </html>
    `
}
