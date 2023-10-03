var aboutTemplate = `
<div>
<div class="homeGradient">
	
	</div>
	<div class="light-bg aboutHero">
        <div class="my-container">
            <div class="columns">
                <div class="column left-side is-flex is-flex-direction-column is-justify-content-center">
                    <p>
                        Bastion strives to support your long-term success in fitness with or without a coach by your side.
                        Everyone
                        deserves to be in control of their fitness!
                    </p>
                    <p>Bastion coaching <a href="#">is better than personal training</a> – it is more focused on education,
                        accountability,
                        motivation,
                        and autonomy.</p>
                </div>
                <div class="column right-side">
                    <div class="hero-image-wrapper">
                        <div class="group-of-dots is-flex is-flex-direction-column top-dots">
							<img src="/resources/homeassets/horizontal-tik-dots.svg" alt="">
							<img src="/resources/homeassets/horizontal-tik-dots.svg" alt="">
							<img src="/resources/homeassets/horizontal-tik-dots.svg" alt="">
						</div>
                        <img src="/resources/homeassets/hero-banner.png" alt="Image of working out" />
                        <div class="group-of-dots is-flex is-flex-direction-column bottom-dots">
							<img src="/resources/homeassets/horizontal-tik-dots.svg" alt="">
							<img src="/resources/homeassets/horizontal-tik-dots.svg" alt="">
							<img src="/resources/homeassets/horizontal-tik-dots.svg" alt="">
						</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
	<div class="believe-banner is-flex is-justify-content-center is-align-items-center">
        <p>We believe through great coaching, anything is possible. </p>
    </div>
	 <div class="my-container aboutCoaches">
        <div class="columns main-coaches-content">
            <div class="column">
                <div class="main-image-wrapper">
                    <img src="/resources/homeassets/frame-bar.svg" alt="A frame of image" class="top-frame-bar">
                    <img src="/resources/homeassets/boxing-girl.png" alt="Image of boxing girl">
                    <img src="/resources/homeassets/frame-bar.svg" alt="A frame of image" class="bot-frame-bar">
                </div>
            </div>
            <div class="column is-three-fifths right-side">
                <h2>
                    Bastion Holds Coaches to the Highest Standards
                </h2>
                <p class="description">
                    We believe that great coaching starts with the coach. This is why we are very selective in choosing our
                    coaches and why we support them as much as we can. Only ~1% of thousands of applicants are accepted to
                    be a Bastion coach.
                </p>

                <div class="divider"></div>

                <p class="block-title">OUR COACHES</p>

                <div class="our-coach-features is-flex is-align-items-center is-justify-content-space-between">
                    <p>Are Nationally Certified</p>
                    <p>Have a Degree in Exercise & Nutrition</p>
                    <p>Already Changed Thousands of Lives</p>
                </div>
            </div>
        </div>
    </div>
	<div class="means-to-coach">
        <div class="my-container means-header">
            <div class="columns">
                <div class="column is-three-fifths">
                    <h3>What it Means to be a Bastion Coach</h3>
                </div>
                <div class="column">
                    <p class="mt-0">We hold our coaches accountable to the values below.</p>
                </div>
            </div>
        </div>

        <div v-for="item in list" :key="item.id">
            <div class="divider"></div>

            <div class="my-container feature-block">
                <div class="columns">
                    <div class="column is-three-fifths">
                        <h2 class="is-align-items-center">{{ item.indexValue }}
                            <img :src="item.mobileIcon" class="mobile-icon">
                        </h2>
                        <h3>
                            {{ item.title }}
                        </h3>
                        <img :src="item.desktopIcon" class="desktop-icon">
                    </div>
                    <div class="column">
                        <p>{{ item.description }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
	<div class="my-container our-values">
        <h2>Our Values</h2>
        <div class="columns is-flex-wrap-wrap">
            <div v-for="item in ourValues" :key="item.id" class="column is-half-from-big-mobile">
                <div class="is-flex value-box">
                    <img :src="item.image">
                    <div class="overlay is-flex-direction-column is-flex is-align-items-center is-justify-content-center">
                        <p class="title">{{ item.title }}</p>
                        <p class="description">{{ item.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
	<div class="my-container careers">
        <h3 id="capply">CAREERS</h3>
        <h2>Join Our Team</h2>
        <p>
            We are always looking for qualified coaches! <a href="#">Apply here</a> if you are a current coach or personal
            trainer looking
            for a remote position and want to make an impact on people's lives.
        </p>
        <p>
            Bastion allows coaches to work at any time, at home, or on the go. You choose how many clients you have and how
            much you work. Apply today.
        </p>

        <button class="apply-button is-justify-content-center is-align-items-center" v-on:click="openApply()">
            APPLY
        </button>
    </div>
	<div class="dark-bg homeFooter" style="margin-top: 2rem;">
        <div class="my-container">
            <div class="columns">
                <div class="column column-center-all logo-and-social">
                    <img src="/resources/homeassets/light-logo.svg" alt="Bastion Logo" class="logo" />
                    <div>
                        <img src="/resources/homeassets/icon-facebook.svg" alt="Bastion Logo" />
                        <img src="/resources/homeassets/icon-twitter.svg" alt="Bastion Logo" class="px-4" />
                        <img src="/resources/homeassets/icon-ig.svg" alt="Bastion Logo" />
                    </div>
                </div>
                <div class="is-hidden-touch column is-flex is-justify-content-space-between">
                    <div class="category-block is-flex is-flex-direction-column">
                        <p>Company</p>
                        <a href="/#/about/#capply">Careers</a>
                        <a href="/#/about/">About Us</a>
                        <a href="/#/about/">About</a>
                    </div>
                    <div class="category-block is-flex is-flex-direction-column">
                        <p>Services</p>
                        <a href="#">Coaches</a>
                        <a href="#">Nutrition</a>
                        <a href="#">Support</a>
                    </div>
                    <div class="category-block is-flex is-flex-direction-column">
                        <p>Training</p>
                        <a href="#">Learn more</a>
                        <a href="#">Features</a>
                        <a href="#">Schedule Consultation</a>
                    </div>
                </div>
            </div>
            <div class="divider"></div>
            <div class="is-flex is-justify-content-space-between is-align-items-center">
                <p class="has-text-centered copyright">©2023 Bastion. All rights reserved</p>
                <div class="is-hidden-touch is-flex terms-gap">
                    <a href="/resources/pp.pdf">Privacy & Policy</a>
                    <a href="/resources/tos.pdf">Terms & Condition</a>
                </div>
            </div>
        </div>
    </div>
</div>
`;


var about = {
  template: aboutTemplate,
  data: function(){
    return{
		ourValues: [{
            id: 0,
            title: 'Humility',
            description: 'To be great, you need to be willing to learn from the greatest. Accept that you do not know everything.',
            image: "/resources/homeassets/humility.png"
        },
        {
            id: 1,
            title: 'Holistic',
            description: 'Anything in life should be from the perspective of a bigger picture. Likewise, fitness is not just about lifting weights, its about improving every aspect of your life.',
            image: "/resources/homeassets/holistic.png"
        },
        {
            id: 2,
            title: 'Expertise',
            description: 'To fuel the highest form of self-improvement, you need to surround yourself with people who are 100% experts at what they do. This is why we hold our coaches to the highest standard.',
            image: "/resources/homeassets/expertise.png"
        },
        {
            id: 3,
            title: 'Self Improvement',
            description: 'Always seek improvement in life, and the easiest way to start is through fitness',
            image: "/resources/homeassets/self-improvement.png"
        }
        ],
		list: [
            {
                id: 0,
                indexValue: '01',
                title: 'Client-Centered',
                description: 'Our coaching philosophy starts with YOU. We make sure our coaches meet you where you’re at and support your decisions.',
                mobileIcon: "/resources/homeassets/blue-client-centered.svg",
                desktopIcon: '/resources/homeassets/client-centered.png'
            },
            {
                id: 1,
                indexValue: '02',
                title: 'Mastery of Their Craft',
                description: 'All of our coaches are masters at what they do. They have extensive experience and education in fitness, with many having Master’s degrees!',
                mobileIcon: '/resources/homeassets/blue-mastery.svg',
                desktopIcon: '/resources/homeassets/mastery.png'
            },
            {
                id: 2,
                indexValue: '03',
                title: 'Psychology',
                description: 'A Bastion coach also knows how to motivate! Many of our coaches have degrees or certifications in psychology and human behavior.',
                mobileIcon: '/resources/homeassets/blue-brain.svg',
                desktopIcon: '/resources/homeassets/brain.png'
            },
            {
                id: 4,
                indexValue: '04',
                title: 'Passion',
                description: 'Lastly, a Bastion coach has a burning passion to help others. They want to see YOU succeed and will do anything to see it happen.',
                mobileIcon: '/resources/homeassets/blue-passion.svg',
                desktopIcon: '/resources/homeassets/passion.png'
            }
        ]
    }
  },
  methods:{
	openApply: function(){
		window.location = "https://forms.gle/bXeUM5DvmeTUtBND8";
	}
  }
 }