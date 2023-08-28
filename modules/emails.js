exports.generateWelcomeHTML = function(name){
	return `<!DOCTYPE html>
<html lang="english">
  <head>
    <title>exported project</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta charset="utf-8" />
    <meta property="twitter:card" content="summary_large_image" />

    <style data-tag="reset-style-sheet">
      html {  line-height: 1.15;}body {  margin: 0;}* {  box-sizing: border-box;  border-width: 0;  border-style: solid;}p,li,ul,pre,div,h1,h2,h3,h4,h5,h6,figure,blockquote,figcaption {  margin: 0;  padding: 0;}button {  background-color: transparent;}button,input,optgroup,select,textarea {  font-family: inherit;  font-size: 100%;  line-height: 1.15;  margin: 0;}button,select {  text-transform: none;}button,[type="button"],[type="reset"],[type="submit"] {  -webkit-appearance: button;}button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner {  border-style: none;  padding: 0;}button:-moz-focus,[type="button"]:-moz-focus,[type="reset"]:-moz-focus,[type="submit"]:-moz-focus {  outline: 1px dotted ButtonText;}a {  color: inherit;  text-decoration: inherit;}input {  padding: 2px 4px;}img {  display: block;}html { scroll-behavior: smooth  }
    </style>
	<style>
	:root {
  --dl-color-gray-500: #595959;
  --dl-color-gray-700: #999999;
  --dl-color-gray-900: #D9D9D9;
  --dl-size-size-large: 144px;
  --dl-size-size-small: 48px;
  --dl-color-danger-300: #A22020;
  --dl-color-danger-500: #BF2626;
  --dl-color-danger-700: #E14747;
  --dl-color-gray-black: #000000;
  --dl-color-gray-white: #FFFFFF;
  --dl-size-size-medium: 96px;
  --dl-size-size-xlarge: 192px;
  --dl-size-size-xsmall: 16px;
  --dl-space-space-unit: 16px;
  --dl-color-primary-100: #003EB3;
  --dl-color-primary-300: #0074F0;
  --dl-color-primary-500: #14A9FF;
  --dl-color-primary-700: #85DCFF;
  --dl-color-success-300: #199033;
  --dl-color-success-500: #32A94C;
  --dl-color-success-700: #4CC366;
  --dl-size-size-xxlarge: 288px;
  --dl-size-size-maxwidth: 1400px;
  --dl-radius-radius-round: 50%;
  --dl-space-space-halfunit: 8px;
  --dl-space-space-sixunits: 96px;
  --dl-space-space-twounits: 32px;
  --dl-radius-radius-radius2: 2px;
  --dl-radius-radius-radius4: 4px;
  --dl-radius-radius-radius8: 8px;
  --dl-space-space-fiveunits: 80px;
  --dl-space-space-fourunits: 64px;
  --dl-space-space-threeunits: 48px;
  --dl-space-space-oneandhalfunits: 24px;
}
.button {
  color: var(--dl-color-gray-black);
  display: inline-block;
  padding: 0.5rem 1rem;
  border-color: var(--dl-color-gray-black);
  border-width: 1px;
  border-radius: 4px;
  background-color: var(--dl-color-gray-white);
}
.input {
  color: var(--dl-color-gray-black);
  cursor: auto;
  padding: 0.5rem 1rem;
  border-color: var(--dl-color-gray-black);
  border-width: 1px;
  border-radius: 4px;
  background-color: var(--dl-color-gray-white);
}
.textarea {
  color: var(--dl-color-gray-black);
  cursor: auto;
  padding: 0.5rem;
  border-color: var(--dl-color-gray-black);
  border-width: 1px;
  border-radius: 4px;
  background-color: var(--dl-color-gray-white);
}
.list {
  width: 100%;
  margin: 1em 0px 1em 0px;
  display: block;
  padding: 0px 0px 0px 1.5rem;
  list-style-type: none;
  list-style-position: outside;
}
.list-item {
  display: list-item;
}
.teleport-show {
  display: flex !important;
  transform: none !important;
}
.Body {
  font-size: 14px;
  font-style: normal;
  font-family: Poppins;
  font-weight: 400px;
  font-stretch: normal;
}
.Content {
  font-size: 16px;
  font-family: Inter;
  font-weight: 400;
  line-height: 1.15;
  text-transform: none;
  text-decoration: none;
}
.Heading {
  font-size: 32px;
  font-family: Inter;
  font-weight: 700;
  line-height: 1.15;
  text-transform: none;
  text-decoration: none;
}

.welcome-email-container {
  width: 100%;
  display: flex;
  overflow: auto;
  min-height: 100vh;
  align-items: center;
  flex-direction: column;
}
.welcome-email-welcome-email {
  width: 100%;
  height: 3505px;
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-shrink: 0;
  background-color: #242424;
}
.welcome-email-text {
  top: 388px;
  left: 42px;
  color: rgba(0, 240, 255, 1);
  width: 1105px;
  height: auto;
  position: absolute;
  font-size: 64px;
  font-style: Black;
  text-align: center;
  font-family: Montserrat;
  font-weight: 900;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.welcome-email-text02 {
  top: 1982px;
  left: 358px;
  color: rgba(0, 240, 255, 1);
  height: auto;
  position: absolute;
  font-size: 40px;
  font-style: SemiBold;
  text-align: left;
  font-family: Montserrat;
  font-weight: 600;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.welcome-email-text04 {
  top: 466px;
  left: 43px;
  color: rgba(255, 255, 255, 1);
  width: 1105px;
  height: auto;
  position: absolute;
  font-size: 32px;
  font-style: Regular;
  text-align: center;
  font-family: Fira Sans;
  font-weight: 400;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.welcome-email-text06 {
  top: 317px;
  left: 464px;
  color: rgba(255, 255, 255, 1);
  height: auto;
  position: absolute;
  font-size: 48px;
  font-style: SemiBold;
  text-align: left;
  font-family: Montserrat;
  font-weight: 600;
  line-height: normal;
  font-stretch: normal;
  text-decoration: none;
}
.welcome-email-text07 {
  font-weight: 600;
  text-decoration: NONE;
}
.welcome-email-copyof-whitenobackgroundbigger1 {
  top: 143px;
  left: 574px;
  width: 41px;
  height: 94px;
  position: absolute;
}
.welcome-email-unsplashe-gsb-vt-v-cw {
  top: 546px;
  left: 99px;
  width: 992px;
  height: 494px;
  position: absolute;
  border-radius: 12px;
}
.welcome-email-socialmediaicons {
  gap: 16px;
  top: 3042px;
  left: 528px;
  width: 133px;
  display: flex;
  position: absolute;
  align-items: center;
}
.welcome-email-facebook {
  width: 34px;
  height: 33.600006103515625px;
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-shrink: 1;
}
.welcome-email-ellipse177 {
  top: 0px;
  left: 0px;
  width: 34px;
  height: 34px;
  position: absolute;
}
.welcome-email-vector {
  top: 0px;
  left: 0px;
  width: 34px;
  height: 34px;
  position: absolute;
}
.welcome-email-twitter {
  width: 34px;
  height: 33.600006103515625px;
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-shrink: 1;
}
.welcome-email-blackfill {
  top: 0px;
  left: 0.0001220703125px;
  width: 34px;
  height: 34px;
  position: absolute;
}
.welcome-email-vector1 {
  top: 0px;
  left: 0px;
  width: 34px;
  height: 34px;
  position: absolute;
}
.welcome-email-insta {
  width: 34px;
  height: 33.600006103515625px;
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-shrink: 1;
}
.welcome-email-blackfill1 {
  top: 0px;
  left: 0.0001220703125px;
  width: 34px;
  height: 34px;
  position: absolute;
}
.welcome-email-vector2 {
  top: 0px;
  left: 0px;
  width: 34px;
  height: 34px;
  position: absolute;
}
.welcome-email-bastion-logo {
  top: 3275px;
  left: 521px;
  width: 147px;
  height: 29px;
  position: absolute;
}
.welcome-email-links {
  top: 3185px;
  left: 485px;
  width: 218px;
  height: 21px;
  display: flex;
  position: absolute;
  align-items: flex-start;
  flex-shrink: 1;
}
.welcome-email-underline {
  top: 17.99981689453125px;
  left: 130px;
  width: 87px;
  height: 1px;
  position: absolute;
}
.welcome-email-underline1 {
  top: 17.99981689453125px;
  left: 0px;
  width: 50px;
  height: 1px;
  position: absolute;
}
.welcome-email-underline2 {
  top: 17.99981689453125px;
  left: 60px;
  width: 61px;
  height: 1px;
  position: absolute;
}
.welcome-email-text09 {
  left: 130px;
  color: rgba(255, 255, 255, 1);
  width: 88px;
  height: auto;
  position: absolute;
  text-align: center;
  line-height: 24px;
}
.welcome-email-text11 {
  left: 61px;
  color: rgba(255, 255, 255, 1);
  width: 59px;
  height: auto;
  position: absolute;
  text-align: center;
  line-height: 24px;
}
.welcome-email-text13 {
  color: rgba(255, 255, 255, 1);
  width: 51px;
  height: auto;
  position: absolute;
  text-align: center;
  line-height: 24px;
}
.welcome-email-text15 {
  top: 3121px;
  left: 334px;
  color: rgba(255, 255, 255, 1);
  width: 520px;
  height: auto;
  position: absolute;
  text-align: center;
  line-height: 24px;
}
.welcome-email-text20 {
  top: 1112px;
  left: 99px;
  color: rgba(0, 240, 255, 1);
  width: 992px;
  height: auto;
  position: absolute;
  font-size: 36px;
  font-style: SemiBold;
  text-align: left;
  font-family: Fira Sans;
  font-weight: 600;
  line-height: 52px;
  font-stretch: normal;
  text-decoration: none;
}
.welcome-email-text21 {
  color: rgba(0, 240, 255, 1);
  font-weight: 600;
}
.welcome-email-text22 {
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
}
.welcome-email-text28 {
  color: rgba(0, 240, 255, 1);
  font-weight: 600;
}
.welcome-email-text29 {
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
}
.welcome-email-text30 {
  color: rgba(0, 240, 255, 1);
  font-weight: 600;
}
.welcome-email-text31 {
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
  text-decoration: NONE;
}
.welcome-email-text32 {
  color: rgba(0, 240, 255, 1);
  font-weight: 600;
  text-decoration: UNDERLINE;
}
.welcome-email-text33 {
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
}
.welcome-email-text39 {
  color: rgba(0, 240, 255, 1);
  font-weight: 600;
}
.welcome-email-text40 {
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
}
.welcome-email-text41 {
  color: rgba(0, 240, 255, 1);
  font-weight: 600;
}
.welcome-email-text42 {
  top: 2752px;
  left: 99px;
  color: rgba(255, 255, 255, 1);
  width: 991px;
  height: auto;
  position: absolute;
  font-size: 32px;
  font-style: Regular;
  text-align: left;
  font-family: Fira Sans;
  font-weight: 400;
  line-height: 48px;
  font-stretch: normal;
  text-decoration: none;
}
.welcome-email-text43 {
  color: rgba(255, 255, 255, 1);
  font-weight: 400;
}
.welcome-email-text44 {
  text-decoration: NONE;
}
.welcome-email-text45 {
  text-decoration: UNDERLINE;
}
.welcome-email-text46 {
  color: rgba(0, 240, 255, 1);
  font-weight: 600;
}
.welcome-email-line1 {
  top: 1835px;
  left: 332px;
  width: 525px;
  height: 1px;
  position: absolute;
}
.welcome-email-pic {
  top: 2131px;
  left: 243px;
  width: 702px;
  height: 521px;
  display: flex;
  overflow: hidden;
  position: absolute;
  align-items: center;
  flex-shrink: 0;
  border-radius: 12px;
  justify-content: flex-end;
  background-image: linear-gradient(180deg, rgba(237, 246, 254, 1) 0%, rgba(237, 246, 254, 0) 100%);
}
.welcome-email-photo {
  top: 0px;
  left: 0px;
  width: 702px;
  height: 521px;
  position: absolute;
}
.welcome-email-event {
  gap: 26.777162551879883px;
  top: 398.5503234863281px;
  left: 0px;
  width: 702px;
  display: flex;
  padding: 32.13259506225586px;
  overflow: hidden;
  position: absolute;
  box-shadow: 0px 7.966622352600098px 11.949933052062988px 0px rgba(20, 19, 91, 0.03999999910593033) ;
  align-items: center;
  flex-shrink: 0;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 1);
}
.welcome-email-typeaddress {
  gap: 2.6777162551879883px;
  width: 388.2688903808594px;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
}
.welcome-email-text48 {
  color: rgba(0, 0, 0, 1);
  height: auto;
  font-size: 24px;
  align-self: stretch;
  font-style: Bold;
  text-align: left;
  font-family: Inter;
  font-weight: 700;
  line-height: 120.00000476837158%;
  font-stretch: normal;
  text-decoration: none;
}
.welcome-email-auto-layout-vertical {
  gap: 10px;
  display: flex;
  overflow: hidden;
  align-items: center;
  border-radius: 8px;
  flex-direction: column;
  justify-content: center;
}
.welcome-email-auto-layout-horizontal {
  gap: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.welcome-email-text50 {
  color: rgba(61, 61, 61, 1);
  height: auto;
  font-size: 16px;
  font-style: Medium;
  text-align: left;
  font-family: Quicksand;
  font-weight: 500;
  line-height: 20px;
  font-stretch: normal;
  text-decoration: none;
}
.welcome-email-frame {
  width: 20px;
  height: 20px;
  display: flex;
  position: relative;
  align-items: flex-start;
  flex-shrink: 0;
}
.welcome-email-frame1 {
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  position: absolute;
}


</style>
    <style data-tag="default-style-sheet">
      html {
        font-family: Inter;
        font-size: 16px;
      }

      body {
        font-weight: 400;
        font-style:normal;
        text-decoration: none;
        text-transform: none;
        letter-spacing: normal;
        line-height: 1.15;
        color: var(--dl-color-gray-black);
        background-color: var(--dl-color-gray-white);

      }
    </style>
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&amp;display=swap"
      data-tag="font"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap"
      data-tag="font"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap"
      data-tag="font"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&amp;display=swap"
      data-tag="font"
    />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&amp;display=swap"
      data-tag="font"
    />
  
  </head>
  <body style="width: 1200px; height: auto;">
    <div>
   

      <div class="welcome-email-container">
        <div class="welcome-email-welcome-email">
          <span class="welcome-email-text">
            <span>WELCOME TO BASTION!</span>
          </span>
          <span class="welcome-email-text02">
            <span>Newest on our blog</span>
          </span>
          <span class="welcome-email-text04">
            <span>Where fitness is done the right way</span>
          </span>
          <span class="welcome-email-text06">
            <span class="welcome-email-text07">Hi</span>
            <span>${name},</span>
          </span>
          <img
            alt="CopyofWhitenobackgroundbigger1135"
            src="https://dev.bastionfit.com/resources/whiterook.png"
            class="welcome-email-copyof-whitenobackgroundbigger1"
          />
          <img
            alt="unsplasheGSBVVtVCCw136"
            src="https://dev.bastionfit.com/resources/ropes.png"
            class="welcome-email-unsplashe-gsb-vt-v-cw"
          />
          <div class="welcome-email-socialmediaicons">
            <div class="welcome-email-facebook">
              <img
                alt="Ellipse177139"
                src=""
                class="welcome-email-ellipse177"
              />
              <img
                alt="Vector140"
                src="https://dev.bastionfit.com/resources/emailicons/vector140-u6cn.svg"
                class="welcome-email-vector"
              />
            </div>
            <div class="welcome-email-twitter">
              <img alt="Blackfill142" src="" class="welcome-email-blackfill" />
              <img
                alt="Vector143"
                src="https://dev.bastionfit.com/resources/emailicons/vector143-vb6k.svg"
                class="welcome-email-vector1"
              />
            </div>
            <div class="welcome-email-insta">
              <img alt="Blackfill145" src="" class="welcome-email-blackfill1" />
              <img
                alt="Vector146"
                src="https://dev.bastionfit.com/resources/emailicons/vector146-oxom.svg"
                class="welcome-email-vector2"
              />
            </div>
          </div>
          <img
            alt="BastionLogo147"
            src="https://dev.bastionfit.com/resources/bastion.png"
            class="welcome-email-bastion-logo"
          />
          <div class="welcome-email-links">
            <img
              alt="underline149"
              src="public/external/underline149-fox.svg"
              class="welcome-email-underline"
            />
            <img
              alt="underline150"
              src="public/external/underline150-r3oe.svg"
              class="welcome-email-underline1"
            />
            <img
              alt="underline151"
              src="public/external/underline151-8v2t.svg"
              class="welcome-email-underline2"
            />
            <span class="welcome-email-text09 Body">
              <span>Unsubscribe</span>
            </span>
            <span class="welcome-email-text11 Body"><span>Account</span></span>
            <span class="welcome-email-text13 Body"><span>Privacy</span></span>
          </div>
          <span class="welcome-email-text15 Body">
            <span>
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </span>
              <br />
              <span>Duis sit vehicula dui sit amet ligula cursus.</span>
            </span>
          </span>
          <span class="welcome-email-text20">
            <span class="welcome-email-text21">We are so excited</span>
            <span class="welcome-email-text22">
              <span>
                to have you onboard and canâ€™t wait until you start working with
                your professional coach.
              </span>
              <br />
              <span></span>
              <br />
              <span>We have received your payment and it will</span>
            </span>
            <span class="welcome-email-text28">
              not be charged until 1 week from now
            </span>
            <span class="welcome-email-text29">
              so that your coach has time to reach out and work on your
            </span>
            <span class="welcome-email-text30">personalized plan.</span>
            <span class="welcome-email-text31">
              Until coach contacts you, take a look at the
            </span>
            <span class="welcome-email-text32">welcome packet</span>
            <span class="welcome-email-text33">
              <span>to see what to expect!</span>
              <br />
              <span></span>
              <br />
              <span>Also, be sure to</span>
            </span>
            <span class="welcome-email-text39">check your inbox</span>
            <span class="welcome-email-text40">
              for another email in order to start using our
            </span>
            <span class="welcome-email-text41">app!</span>
          </span>
          <span class="welcome-email-text42">
            <span class="welcome-email-text43">
              P.S. Don't miss out on checking out our
            </span>
            <span class="welcome-email-text44"></span>
            <span class="welcome-email-text45">blog</span>
            <span class="welcome-email-text46"></span>
            <span>
              for a plethora of valuable information your future Bastion coach
              will likely be using while working with you ðŸ‘€
            </span>
          </span>
          <img
            alt="Line1158"
            src="https://dev.bastionfit.com/resources/emailicons/line1158-ipi.svg"
            class="welcome-email-line1"
          />
          <div class="welcome-email-pic">
            <img
              alt="Photo160"
              src="https://dev.bastionfit.com/resources/blogpreview.png"
              class="welcome-email-photo"
            />
            <div class="welcome-email-event">
              <div class="welcome-email-typeaddress">
                <span class="welcome-email-text48">
                  <span>Body Fat Spot Reduction Isnâ€™t a Myth?</span>
                </span>
              </div>
              <div class="welcome-email-auto-layout-vertical">
                <div class="welcome-email-auto-layout-horizontal">
                  <span class="welcome-email-text50">
                    <span>Read more</span>
                  </span>
                  <div class="welcome-email-frame">
                    <img
                      alt="Frame168"
                      src="https://dev.bastionfit.com/resources/emailicons/frame168-dwqf.svg"
                      class="welcome-email-frame1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>
`

}