<template>
  <div class="main-content">
    <div class="top">
      <button  @click="addCircle()">反対です</button>
      <div class="total-number">{{ totalNumber }}</div>
      <div ref="scene" class="scene"></div>
    </div>
    <div class="center-line"></div>
    <div class="center">
      <!-- <h3>Slack廃止に賛成ですか？</h3> -->
      <h3>賛成ですか</h3>
    </div>
    <div class="bottom">
      <button>賛成です</button>
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
      }
    },
    methods: {
    setupPhysics() {
      this.engine = Matter.Engine.create();
      this.$nextTick(() => {
        const container = this.$refs.scene;
        const width = container.clientWidth; // Get the width of the container
        const height = container.clientHeight; // Get the height of the container

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

        const ground = Matter.Bodies.rectangle(0, height+10, width, 10, { isStatic: true });
        // Add the ground and possibly other initial bodies to the world
        Matter.World.add(this.engine.world, [ground]);

        Matter.Engine.run(this.engine);
        Matter.Render.run(this.render);
      });
    },
    addCircle() {
      console.log(`Adding a circle`);
      const circle = Matter.Bodies.circle(200, 0, 64, {
        density: 0.04,
        frictionAir: 0.005,
        restitution: 0.8,
        render: {
          sprite: {
            texture: slackLogo,
            xScale: 0.25,
            yScale: 0.25,
          },
        },
      });

      Matter.World.add(this.engine.world, circle); // Make sure to add to the correct world
      this.totalNumber++;
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
  }
  .main-content .top button{
    background-color: #A31621;
  }
  .main-content .bottom button{
    background-color: #4E8098;
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
