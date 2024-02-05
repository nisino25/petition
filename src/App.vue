<template>
  <div class="main-content">
    <div class="top">
      <button  @click="addCircle()">反対です</button>
      <div class="total-number">{{ totalNumber }}</div>
      <div ref="scene" class="scene" id="matter-js-container"></div>
    </div>
    <div class="center-line"></div>
    <div class="center">
      <!-- <h3>Slack廃止に賛成ですか？</h3> -->
      <h3>Slack廃止に賛成ですか</h3>
    </div>
    <div class="bottom">
      <!-- <button>賛成です</button> -->
      <div  class="button-container"
    @mousemove="handleMouseMove"
  >
    <button 
      :style="{ position: 'absolute', top: `${buttonTop}px`, left: `${buttonLeft}px` }"
      ref="button"
    >
      賛成です
    </button>
  </div>
      <div class="total-number">0</div>
    </div>
  </div>
</template>

<script>
  import Matter from 'matter-js';
  import slackLogo from '@/assets/slack_logo_icon.png';

  export default {
    name: 'App',
    components: {
    },
    data(){
      return{
        totalNumber: 0,
        engine: null,
        render: null,
        world: null,

        containerWidth: null,
        circles : [],

        buttonTop: 100, // Initial top position
        buttonLeft: 100, // Initial left position
        moveDistance: 50,

        nearDistance: 150,
      }
    },
    methods: {
    setupPhysics() {
      this.engine = Matter.Engine.create();
      this.$nextTick(() => {
        // const width = container.clientWidth
        // this.containerWidth = container.clientWidth; // Get the width of the container
        const container = document.getElementById('matter-js-container');
        const width = container.offsetWidth;
        const height = container.offsetHeight;

        


        this.render = Matter.Render.create({
          element: container,
          engine: this.engine,
          options: {
            width,
            height,
            wireframes: false,
            background: 'whitesmooke',
          },
        });

        const ground = Matter.Bodies.rectangle((width / 2) , height + 10, width, 10, { isStatic: true });
        Matter.World.add(this.engine.world, [ground]);


        Matter.Engine.run(this.engine);
        Matter.Render.run(this.render);
      });
    },
    addCircle() {
      const container = document.getElementById('matter-js-container');
      const width = container.offsetWidth;
      // Generate a random x position within the container's width
      const randomX = Math.random() * width;

      const circle = Matter.Bodies.circle(randomX, 0, 127.5, {
        density: 0.04,
        frictionAir: 0.005,
        restitution: 0.8,
        render: {
          sprite: {
            texture: slackLogo, // Make sure slackLogo is defined or replace with a valid URL
            xScale: 0.5,
            yScale: 0.5,
          },
        },
      });

      Matter.World.add(this.engine.world, [circle]); // Make sure to add to the correct world
      this.totalNumber++; // Assuming this.totalNumber is initialized somewhere
      this.circles.push(circle);
      this.checkAndRemoveCircles();
    },

    checkAndRemoveCircles() {
        const containerHeight = document.getElementById('matter-js-container').offsetHeight;

        // Filter out circles that have fallen out of the container
        this.circles = this.circles.filter(circle => {
            const isInsideContainer = circle.position.y < containerHeight;
            if (!isInsideContainer) {
                Matter.World.remove(this.engine.world, circle);
            }
            return true; // Keep in the new array
        });

    },

    moveButton() {
      // Randomize the button's new position within the container bounds
      this.buttonTop = Math.max(0, Math.min(250, this.buttonTop + (Math.random() < 0.5 ? -this.moveDistance : this.moveDistance)));
      this.buttonLeft = Math.max(0, Math.min(250, this.buttonLeft + (Math.random() < 0.5 ? -this.moveDistance : this.moveDistance)));
    },

    handleMouseMove(e) {
  const containerRect = this.$el.getBoundingClientRect();
  const buttonRect = this.$refs.button.getBoundingClientRect();

  // Calculate mouse position relative to the container
  const mouseX = e.clientX - containerRect.left;
  const mouseY = e.clientY - containerRect.top;

  // Calculate the center of the button
  const buttonCenterX = buttonRect.left + buttonRect.width / 2 - containerRect.left;
  const buttonCenterY = buttonRect.top + buttonRect.height / 2 - containerRect.top;

  // Calculate the distance between the mouse and the button center
  const distanceX = buttonCenterX - mouseX;
  const distanceY = buttonCenterY - mouseY;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // Set a maximum distance the button can move
  const maxMoveDistance = 20; // Adjust this value as needed

  // Calculate the ratio of movement based on the distance and the maximum allowed distance
  const moveRatio = Math.min(1, maxMoveDistance / distance);

  // Calculate the new position of the button
  const newTop = this.buttonTop - distanceY * moveRatio;
  const newLeft = this.buttonLeft - distanceX * moveRatio;

  // Ensure the button stays within the container's bounds
  this.buttonTop = Math.max(0, Math.min(containerRect.height - buttonRect.height, newTop));
  this.buttonLeft = Math.max(0, Math.min(containerRect.width - buttonRect.width, newLeft));
},


    

  },
  mounted() {
    console.clear()
    this.setupPhysics();
  },
  }
</script>

<style>
  #app {
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    

    font-family: 'Black Ops One', system-ui;
    font-family: 'Zen Maru Gothic', serif;
  }

  html{
    background-color: whitesmoke; 
  }

  .scene {
    border: 1px solid green;
    display: block;
    width: 100%;
    height: 100%;
    /* background-color: red; */
  }
  .main-content{
    border: 2px solid black;
    display: block;

    width: 90%;
    height: 90%;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    overflow: hidden;
  }
  .main-content .center{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 20;
    border: 2px solid black;
    padding: 10px 50px;
    background-color: white;
  }
  .main-content .center::before, .main-content .center::after{
    content: "";

    position: absolute;
    right: 100%;
    height: 2px;
    width: 100vw;
    background: black;
    top: 50%;
    transform: translateY(-50%);
  }
  .main-content .center::before{
    right: unset;
    left: 100%;
  }






  /* ------------------------------ */
  

  .main-content .top{
    position: absolute;
    top: 0;
    display: block;
    height: 50%;
    width: 100%;
    /* background-color: #A31621; */
  }
  .main-content .bottom{
    position: absolute;
    bottom: 0;
    display: block;
    height: 50%;
    width: 100%;
    /* background-color: #4E8098; */
  }
  button{
    cursor: pointer;;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 5px 20px;
    border: unset;
    background-color: #A31621;
    border-radius: 5px;
    color: white;
    font-size: 1.5em;
    display: flex;
    align-items: center;
    line-height: 1.5;
    z-index: 10;

    transition: top 0.5s, left 0.5s; 
  }
  .main-content .top button{
    background-color: #A31621;
  }
  .main-content .bottom button{
    background-color: #4E8098;
  }

  .button-container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);

    width: 80%;
    height: 80%;
  }






  .total-number{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20em;
    opacity: .3;

    z-index: 5;
    display: flex;
    align-items: center;
    line-height: 1;

    pointer-events: none;
  }

  
</style>
