var homeTemplate = `
<div>
	<div class="homeGradient">
	
	</div>
	<section class="light-bg homeHero" style="padding-bottom: 2rem;">
        <div class="my-container hero-container">
            <div class="columns is-align-items-center">
                <div class="column is-three-fifths left-side">
                    <h1 class="has-text-black">The Right Coach Is Everything.</h1>
                    <h2 class="has-text-black">
                        Match with a specialized coach. <br />
                        Accelerate your progress. <br />
                        Become your best self.
                    </h2>
                    <div class="is-relative is-hidden-tablet mobile-hero-video">
                        <img class="dots-narrow" src="/resources/homeassets/dots-narrow.svg" alt="Decorative dots image" />
                        <img class="dots-wide" src="/resources/homeassets/dots-wide.svg" alt="Decorative dots image" />
                        <div class="video-wrapper">
                            <video src="/resources/homeassets/hero.mp4" autoplay loop muted></video>
                        </div>
                    </div>
                    <div class="is-flex buttons">
                        <button class="primary-button" v-on:click="$parent.navigate('/survey')">
                            Find your Coach
                        </button>
                        <button class="secondary-button" v-on:click="$parent.navigate('/about')">
                            Learn More
                            <img src="/resources/homeassets/arrow-up-right.svg" alt="Right arrow icon" />
                        </button>
                    </div>
                </div>
                <div class="column is-relative is-visible-desktop">
                    <img class="dots-narrow" src="/resources/homeassets/dots-narrow.svg" alt="Decorative dots image" />
                    <img class="dots-wide" src="/resources/homeassets/dots-wide.svg" alt="Decorative dots image" />
                    <div class="video-wrapper">
                        <video src="/resources/homeassets/hero.mp4" autoplay loop muted></video>
                    </div>
                </div>
            </div>
        </div>
    </section>
	
	  <section class="dark-bg homeFeatured" style="position: sticky; z-index: 10;">
        <div class="is-flex is-align-items-center featured-wrapper">
            <div class="column is-one-third">
                <p class="is-uppercase has-text-white heading-normal">
                    Featured On
                </p>
            </div>
            <div class="column">
                <img class="celsius-logo" src="/resources/homeassets/logo-celsius.svg" alt="Celsius icon" />
                <img class="michigan-logo" src="/resources/homeassets/logo-michigan-daily.svg" alt="The Michigan Daily icon" />

            </div>
        </div>
    </section>
	
	 <section class="how-bastion-works light-bg homeHow">
        <div class="my-container is-relative">
            <img class="dots-top is-hidden-touch" src="/resources/homeassets/dots-2-rows.svg" alt="Decorative dots image" />
            <h2 class="mobile-title">How Bastion Works</h2>
            <div class="my-cards is-relative">
                <div v-for="(item, index) in slideItems" :key="item.id" class="is-flex my-card" :class="['card-' + indexList[index]]">
                    <div class="is-fullwidth is-fullheight bastion-card-content">
                        <div>
                            <h3 class="card-header is-uppercase has-text-weight-bold">{{ item.title }}</h3>
                            <p class="is-secondary-font card-description">{{ item.description }}</p>
                        </div>
                        <!-- <p class="is-size-8 is-uppercase is-relative value-text">

                        </p> -->
                        <img :class="{ 'toggling-icon': indexList[index] === 2 }" :src="item.image" alt="Upward icon" />
                    </div>
                </div>
            </div>
            <img class="dots-bottom is-hidden-touch" src="/resources/homeassets/dots-2-rows.svg" alt="Decorative dots image" />
        </div>
    </section>
	
	<section class="is-clipped dark-bg homeCoaches">
        <div class="my-container">
            <div class="content-wrapper">
                <div class="has-text-white">
                    <img class="dots" src="/resources/homeassets/dots-1-row.svg" alt="Decorative dots" />
                    <h2 class="has-text-weight-bold">The best coaches for your best self.</h2>
                    <p class="subheader">Nationally certified in personal training, nutrition, behavior change,
                        and years of experience with
                        beginners
                        to world-class athletes.</p>
                    <button class="button" v-on:click="$parent.navigate('/survey')">
                        View All Coaches
                        <img src="/resources/homeassets/arrow-right.svg" alt="Right arrow icon" class="is-hidden-touch" />
                        <img src="/resources/homeassets/long-arrow.svg" alt="Right arrow icon" class="is-hidden-tablet" />
                    </button>
                </div>

				 <div class="slider desktopCoachSlider">
					<div class="coaches-wrapper">
						<div v-for="(coach, index) in coaches" :key="coach.id" class="coach-card" :class="['card-' + (indexList2[index] <= 3 ? indexList2[index] : 'none')]">
							
							<img :src="coach.image" :alt="coach.name" />
							<div class="text-container">
								<p class="is-size-5 has-text-weight-bold has-text-black pb-3">{{ coach.name }}</p>
								<p class="has-text-weight-semibold description2">{{ coach.feature }}</p>
								<p class="has-text-weight-semibold description2">{{ coach.major }}</p>
								<a class="is-uppercase has-text-weight-medium has-text-centered pt-5 is-block" href="/#/survey">View
									Profile</a>
							</div>
						</div>
					</div>
					<div class="arrows-container is-flex is-justify-content-center">
						<img :src="ArrowLeft" alt="Left arrow" class="mx-4" id="prev-coach" @click="chooseActiveCoach(false)" />
						<img :src="ArrowRight" alt="Right arrow" class="mx-4" id="next-coach" @click="chooseActiveCoach(true)" />
					</div>
				</div>
            </div>

        </div>
        <div class="swiper mobile-coaches-slider" v-if="$parent.isMobile">
			<div id="coaches-swiper" class="swiper-wrapper coaches-wrapper">
				<div v-for="(coach) in coaches" :key="coach.id" class="swiper-slide">
					<div class="coach-card">
						<img :src="coach.image" :alt="coach.name" />
						<div class="text-container">
							<p class="is-size-5 has-text-weight-bold has-text-black pb-3">{{ coach.name }}</p>
							<p class="has-text-weight-semibold description2">{{ coach.feature }}</p>
							<p class="has-text-weight-semibold description2">{{ coach.major }}</p>
							<a class="is-uppercase has-text-weight-medium has-text-centered pt-5 is-block" href="/#/survey">View
								Profile</a>
						</div>
					</div>
				</div>
			</div>
		</div>
    </section>
	
	<section class="light-bg homeWhy">
        <div class="my-container">
            <div class="columns is-variable is-2 ">
                <div class="column is-one-third main-column">
                    <div class="is-flex is-flex-direction-column">
                        <h2 class="has-text-weight-bold">Why Bastion</h2>
                        <p class="has-text-weight-semibold has-text-black subheader">Highly credible coaches. Best
                            in-class
                            personal training App</p>
                        <img src="/resources/homeassets/woman-climbing.jpg" alt="Woman climbing exercise wall"
                            class="is-hidden-mobile" />
                    </div>
                </div>
                <div class="column is-one-third py-0-mobile">
                    <div class="is-flex is-flex-direction-column cards-column-1">
                        <div class="has-text-white feature-card feature-card-hover-1">
                            <h3 class="blue-line">Evidence-Based</h3>
                            <p>Many of our coaches have a Bachelor’s or higher degree in exercise science, psychology,
                                biomechanics, health, and more.</p>
                        </div>
                        <div class="has-text-white feature-card feature-card-hover-2">
                            <h3 class="purple-line">Personalized</h3>
                            <p>Our coaches meet you where you are at. You can only workout once a week? No problem. Our
                                coaches work with you no matter what life throws at you and get you to a place YOU are happy
                                with.</p>
                        </div>
                    </div>
                </div>
                <div class="column is-one-third py-0-mobile">
                    <div class="is-flex is-flex-direction-column">
                        <div class="has-text-white feature-card feature-card-hover-3">
                            <h3 class="yellow-line">Holistic</h3>
                            <p>We understand that fitness is not just about exercise. It comes from setting the right
                                mindset, a proper approach to nutrition, and developing everyday habits to make it part of
                                your lifestyle.</p>
                        </div>
                        <div class="has-text-white feature-card feature-card-hover-4">
                            <h3 class="green-line">Goal Oriented</h3>
                            <p>Setting a big goal to strive for is great. But our coaches take this to the next level by
                                setting mini goals for you every step of the way so you can develop key habits.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
	
	<section class="dark-bg is-relative homeClients">
        <img class="dots-wide is-hidden-touch" src="/resources/homeassets/dots-wide2.svg" alt="Decorative dots image" />
        <div class="client-container">
            <h2 class="has-text-white has-text-weight-bold is-uppercase">
                What Clients Say About Us
            </h2>
            <div class="slider">
                <div class="clients-wrapper">
                    <div v-for="(client, index) in clients" :key="client.id" class="client-card" :class="['card-' + indexList[index]]">
                        <div class="client-avatar-wrapper is-relative">
                            <img src="/resources/homeassets/client-comment.png" alt="Client avatar" class="comment-icon">
                            <img :src="client.image" alt="Client avatar" class="avatar">
                        </div>
                        <div class="divider"></div>
                        <div>
                            <p class="name">{{ client.name }}</p>
                            <p class="jobtitle">{{ client.job }}</p>
                            <p class="comment">{{ client.comment }}</p>
                        </div>
                        <div v-if="indexList[index] !== 2" class="overlay"></div>
                    </div>
                </div>
            </div>
			<div class="swiper mobile-clients-slider swiper2" v-if="$parent.isMobile">
				<div class="swiper-wrapper" id="clients-swiper">
					<div class="swiper-slide" v-for="client in clients" :key="client.id">
						<div class="client-card">
							<div class="client-avatar-wrapper is-relative">
								<img src="/resources/homeassets/client-comment.png" alt="Client avatar" class="comment-icon">
								<img :src="client.image" alt="Client avatar" class="avatar">
							</div>
							<div>
								<p class="name">{{ client.name }}</p>
								<p class="jobtitle">{{ client.job }}</p>
								<p class="comment">{{ client.comment }}</p>
							</div>
						</div>
					</div>
				</div>
			</div>

            <div class="is-justify-content-center controls-container">
                <button class="prev is-size-2 has-text-black has-text-weight-normal"
                    @click="chooseActiveCard(false)">&#60;</button>
                <button class="is-size-2 has-text-black has-text-weight-normal"
                    @click="chooseActiveCard(true)">&#62;</button>
            </div>
        </div>
        <img class="dots-narrow is-hidden-touch" src="/resources/homeassets/dots-narrow2.svg" alt="Decorative dots image" />
    </section>
	<section class="light-bg homeBlog">
        <div class="my-container">
            <h2 class="has-text-black has-text-weight-bold">New On Our Blog</h2>
            <div class="columns">
                <div class="column is-half">
                    <div class="is-flex is-flex-direction-column has-background-white big-card">
                        <div class="big-card-image-wrapper">
                            <img src="/resources/homeassets/dumbbells.jpg" alt="Image of gym dumbbells" />
                        </div>
                        <div class="top-blog is-flex is-justify-content-space-between is-align-items-center">
                            <h3 class="has-text-weight-bold has-text-black">
                                Body Fat Spot Reduction Isn’t a Myth?
                            </h3>
                            <a class="read-more is-flex is-align-items-center" href="https://blog.bastionfit.com/p/diet-follow-weight-loss">
                                Read More
                                <img class="pl-2" src="/resources/homeassets/icon-arrow-circle.svg" alt="" />
                            </a>
                        </div>

                    </div>
                </div>
                <div class="column is-half">
                    <div class="is-flex is-flex-direction-column is-justify-content-space-between">
                        <div class="is-flex has-background-white small-card">
                            <div class="small-card-image-wrapper">
                                <img src="https://media.beehiiv.com/cdn-cgi/image/format=auto,width=800,height=421,fit=scale-down,onerror=redirect/uploads/asset/file/6006aece-779e-4814-8783-bfbb5e2131d7/brooke-lark-jUPOXXRNdcA-unsplash.jpg" alt="Image of woman doing situp" />
                            </div>
                            <div class="small-card-text-wrapper">
                                <h3 class="has-text-weight-bold has-text-black">The Only Nutrition Guide You'll Ever Need</h3>
                                <div class="read-more is-flex is-align-items-center">
                                    <a class="is-flex" href="https://blog.bastionfit.com/p/the-only-nutrition-guide-you-ll-ever-need-4f15">Read More <img class="pl-2"
                                            src="/resources/homeassets/icon-arrow-circle.svg" alt="" /></a>
                                </div>
                            </div>
                        </div>
                        <div class="is-flex has-background-white small-card">
                            <div class="small-card-image-wrapper">
                                <img src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,format=auto,onerror=redirect,quality=80/uploads/asset/file/eb30cdd1-fb07-44ae-ab98-79ab271e3952/6414fdf9a397e98e4d7c48f4_Hypertrophy_Blog_Article.png" alt="Image of woman in gym class" />
                            </div>
                            <div class="small-card-text-wrapper">
                                <h3 class="has-text-weight-bold has-text-black">Everything We Know About Building Muscle</h3>
                                <div class="read-more is-flex is-align-items-center">
                                    <a class="is-flex" href="https://blog.bastionfit.com/p/everything-we-know-about-hypertrophy">Read More <img class="pl-2"
                                            src="/resources/homeassets/icon-arrow-circle.svg" alt="" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
	<div class="dark-bg homeFooter">
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


var home = {
  template: homeTemplate,
  data: function(){
    return{
		ArrowLeft: "/resources/homeassets/arrow-left-short.svg",
		ArrowRight: "/resources/homeassets/arrow-right-short.svg",
		slideItems: [
            {
                id: 1,
                title: 'CUSTOM EXERCISE & NUTRITION PLANS',
                description: 'Your coach will craft the perfect exercise and nutrition plan for your goals. They will constantly make sure you are on track and adjust the plan as needed.',
                image: "/resources/homeassets/icon-upward.svg",
            },
            {
                id: 2,
                title: 'BUILDING LIFE LONG HABITS',
                description: 'Your coach will help you build sustainable habits and tools that you can use for the rest of your life to be successful in fitness with OR without a coach.',
                image: "/resources/homeassets/icon-dumbell.svg",
            },
            {
                id: 3,
                title: 'MONITORING AND ACCOUNTABILITY',
                description: 'Your coach will check-in with you frequently to get feedback and hold you accountable. You can also get in contact with them anytime when you need them.',
                image: "/resources/homeassets/icon-monitor.svg",
            }
		],
		coaches: [
            {
                id: 1,
                name: 'Megan H.',
                feature: 'Goal Oriented',
                major: 'Weight Loss and Strength',
                image: "/resources/homeassets/coach-megan.png",
            },
            {
                id: 2,
                name: 'Lucas H.',
                feature: 'Empathetic',
                major: 'Holistic Wellness',
                image: "/resources/homeassets/coach-lucas.jpg",
            },
            {
                id: 3,
                name: 'Jordan C.',
                feature: 'Tough Love',
                major: 'Weight Loss',
                image: "/resources/homeassets/coach-jordan.jpg",
            },
            {
                id: 4,
                name: 'Jesse V.',
                feature: 'Tough Love',
                major: 'Weight Loss',
                image: "/resources/homeassets/coach-sebastien.jpg",
            },
            {
                id: 5,
                name: 'Steven Y.',
                feature: 'Goal Oriented',
                major: 'Weight Loss and Strength',
                image: "/resources/homeassets/randomguy2.png",
            },
        ],
		clients: [
            {
                id: 1,
                name: 'Kaitlin',
                job: 'Coach',
                comment: `Bastion provides me with the tools to track my clients' progress, communicate effectively, and tailor workouts and nutrition plans to their specific needs. The personalized nutrition advice has been a game-changer. I feel absolutely amazing.`,
                image: "/resources/homeassets/client-woman2.jpg",
            },
            {
                id: 2,
                name: 'Michael',
                job: 'Athletics / Trainer',
                comment: `Bastion connected me with an amazing coach who understood my goals and designed a training program tailored to my needs. The personalized nutrition advice has been a game-changer, and I feel more energetic and confident than ever before`,
                image: "/resources/homeassets/randomguy.png",
            },
            {
                id: 3,
                name: 'James',
                job: 'Trainer',
                comment: `Balancing a demanding job and family life, I struggled to prioritize my health and fitness. That's when I discovered Bastion. The platform matched me with a dedicated coach who has been a game-changer in my fitness journey. Bastion has been a total game-changer.`,
                image: "/resources/homeassets/client-man.jpg",
            }
        ],
		indexList: [1,2,3],
		indexList2: [1,2,3,4,5]
		
    }
  },
  methods:{
	chooseActiveCard: function(){
		const itemToFind = this.indexList[0];
        this.indexList.push(itemToFind);
        this.indexList.splice(0, 1);
		console.log(this.indexList);
	},
	chooseActiveCoach: function(value){
		 if (value) {
			const itemToFind = this.indexList2[0];
			this.indexList2.push(itemToFind);
			this.indexList2.splice(0, 1);
		}
		else {
			const itemToFind = this.indexList2[2];
			this.indexList2.unshift(itemToFind);
			this.indexList2.splice(3, 1);
		}
	}
  },
  created: async function(){
	  setInterval(() => {
                this.chooseActiveCard()
            }, 5000);
			
		const params = {
            slidesPerView: 1.5,
            pagination: true,
            paginationClickable: true,
            spaceBetween: 32,
            centeredSlides: true,
            injectStyles: [
                `
                    .swiper {
                        padding-bottom: 3rem;
                    }
                `
            ],
            breakpoints: {
                769: {
                    slidesPerView: 2,
                    centeredSlides: false,
                },
            },
        };
		const params2 = {
            slidesPerView: 1,
            loop: true,
            spaceBetween: 32,
            grabCursor: true,
            centeredSlides: true,
            observer: true,
            injectStyles: [
                `
                .swiper {
                    padding-bottom: 3.625rem;
                }
                .swiper-horizontal > .swiper-scrollbar {
                    width: 50%;
                    left: 50%;
                    transform: translateX(-50%);
                }
                .swiper-scrollbar-drag {
                    background-color: var(--main-blue);
                }
                `,
            ],
        };
		await this.$parent.sleep(200);
		var swiper = new Swiper(".swiper", params);
		var swiper2 = new Swiper(".swiper2", params2);
		console.log("xd");
		
  }
 }