var app = new Vue({
  el: '#app',
  data: {
    red1: 0,
    green1: 0,
    blue1: 0,
    hex1: "",
    red2: 0,
    green2: 0,
    blue2: 0,
    hex2: "",
    red3: 0,
    green3: 0,
    blue3: 0,
    hex3: "",
    showForm: false,
    user: null,
    username: '',
    password: '',
    error: '',
    name: '',
    addedProblem: '',
    colorSchemes: {},
  },
  created() {
    this.random();
    this.changeHandler();
    this.getUser();
    this.getColorSchemes();
  },
  methods: {
    random() {
      this.red1 = Math.floor(Math.random() * 256);
      this.green1 = Math.floor(Math.random() * 256);
      this.blue1 = Math.floor(Math.random() * 256);
      this.red2 = Math.floor(Math.random() * 256);
      this.green2 = Math.floor(Math.random() * 256);
      this.blue2 = Math.floor(Math.random() * 256);
      this.red3 = Math.floor(Math.random() * 256);
      this.green3 = Math.floor(Math.random() * 256);
      this.blue3 = Math.floor(Math.random() * 256);
      this.changeHandler();
    },
    rgbToHex(r, g, b) {
      var rgb = b | (g << 8) | (r << 16);
      return '#' + (0x1000000 + rgb).toString(16).slice(1).toUpperCase();
    },
    changeHandler() {
      document.getElementById("color1").style.backgroundColor = "rgb(" + this.red1 + "," + this.green1 + ","  + this.blue1 + ")";
      var color1Sum = Number(this.red1) + Number(this.green1) + Number(this.blue1);
      if (color1Sum > 382) {
        document.getElementById("color1").style.color = "rgb(0,0,0)";
      }
      else {
        document.getElementById("color1").style.color = "rgb(255,255,255)";
      }
      this.hex1 = this.rgbToHex(this.red1, this.green1, this.blue1);
      
      document.getElementById("color2").style.backgroundColor = "rgb(" + this.red2 + "," + this.green2 + ","  + this.blue2 + ")";
      var color2Sum = Number(this.red2) + Number(this.green2) + Number(this.blue2);
      if (color2Sum > 382) {
        document.getElementById("color2").style.color = "rgb(0,0,0)";
      }
      else {
        document.getElementById("color2").style.color = "rgb(255,255,255)";
      }
      this.hex2 = this.rgbToHex(this.red2, this.green2, this.blue2);
      
      document.getElementById("color3").style.backgroundColor = "rgb(" + this.red3 + "," + this.green3 + ","  + this.blue3 + ")";
      var color3Sum = Number(this.red3) + Number(this.green3) + Number(this.blue3);
      if (color3Sum > 382) {
        document.getElementById("color3").style.color = "rgb(0,0,0)";
      }
      else {
        document.getElementById("color3").style.color = "rgb(255,255,255)";
      }
      this.hex3 = this.rgbToHex(this.red3, this.green3, this.blue3);
    },
    closeForm() {
      this.showForm = false;
    },
    toggleForm() {
      this.error = "";
      this.username = "";
      this.password = "";
      this.showForm = !this.showForm;
    },
    async register() {
      this.error = "";
      try {
        let response = await axios.post("/api/users", {
          username: this.username,
          password: this.password
        });
        this.user = response.data;
        // close the dialog
        this.toggleForm();
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async login() {
      this.error = "";
      try {
        let response = await axios.post("/api/users/login", {
          username: this.username,
          password: this.password
        });
        this.user = response.data;
        // close the dialog
        this.toggleForm();
      } catch (error) {
        this.error = error.response.data.message;
      }
      this.getColorSchemes();
    },
    async logout() {
    try {
      let response = await axios.delete("/api/users");
      this.user = null;
      } catch (error) {
        // don't worry about it
      }
      this.getColorSchemes();
    },
    async getUser() {
      try {
        let response = await axios.get("/api/users");
        this.user = response.data;
      } catch (error) {
        // Not logged in. That's OK!
      }
    },
    async getColorSchemes() {
      try {
        let response = await axios.get("/api/colors");
        this.colorSchemes = response.data;
        var htmlString = "";
         for (var i = 0; i < this.colorSchemes.length; i++) {
           if (this.user != null && this.colorSchemes[i].username == this.user.username) {
             htmlString += "<h3>" + this.colorSchemes[i].name + "</h3>";
             var id1 = "box" + i + "1";
             var id2 = "box" + i + "2";
             var id3 = "box" + i + "3";
             htmlString += "<button class='colorBox' id=" + id1 + ">"+ this.colorSchemes[i].red1 + ", " + this.colorSchemes[i].green1 + ", " + this.colorSchemes[i].blue1 + "<br>" + this.rgbToHex(this.colorSchemes[i].red1, this.colorSchemes[i].green1, this.colorSchemes[i].blue1) +"</button>";
             htmlString += "<button class='colorBox' id=" + id2 + ">"+ this.colorSchemes[i].red2 + ", " + this.colorSchemes[i].green2 + ", " + this.colorSchemes[i].blue2 + "<br>" + this.rgbToHex(this.colorSchemes[i].red2, this.colorSchemes[i].green2, this.colorSchemes[i].blue2) +"</button>";
             htmlString += "<button class='colorBox' id=" + id3 + ">"+ this.colorSchemes[i].red3 + ", " + this.colorSchemes[i].green3 + ", " + this.colorSchemes[i].blue3 + "<br>" + this.rgbToHex(this.colorSchemes[i].red3, this.colorSchemes[i].green3, this.colorSchemes[i].blue3) +"</button>";
             //var idString = "delete" + i;
             //htmlString += "<button id='delete" + String(i) + "'>Delete</button>";
             //htmlString += "<button @click='deleteColorScheme()'>Delete</button>";
             //var cs = this.colorSchemes[i];
             //htmlString += '<button @click.native="deleteColorScheme" type="button">Delete</button>';
             console.log(htmlString);
           }
         }
         document.getElementById("colorSchemeList").innerHTML = htmlString;
         for (var i = 0; i < this.colorSchemes.length; i++) {
           if (this.user != null && this.colorSchemes[i].username == this.user.username) { 
             document.getElementById("box" + i + "1").style.backgroundColor = "rgb(" + this.colorSchemes[i].red1 + "," + this.colorSchemes[i].green1 + "," + this.colorSchemes[i].blue1 + ")";
             var colorSum1 = Number(this.colorSchemes[i].red1) + Number(this.colorSchemes[i].green1 + Number(this.colorSchemes[i].blue1));
             if (colorSum1 > 382) {
               document.getElementById("box" + i + "1").style.color = "rgb(0,0,0)";
             }
             else {
               document.getElementById("box" + i + "1").style.color = "rgb(255,255,255)";
             }
             document.getElementById("box" + i + "2").style.backgroundColor = "rgb(" + this.colorSchemes[i].red2 + "," + this.colorSchemes[i].green2 + "," + this.colorSchemes[i].blue2 + ")";
             var colorSum2 = Number(this.colorSchemes[i].red2) + Number(this.colorSchemes[i].green2 + Number(this.colorSchemes[i].blue2));
             if (colorSum2 > 382) {
               document.getElementById("box" + i + "2").style.color = "rgb(0,0,0)";
             }
             else {
               document.getElementById("box" + i + "2").style.color = "rgb(255,255,255)";
             }
             document.getElementById("box" + i + "3").style.backgroundColor = "rgb(" + this.colorSchemes[i].red3 + "," + this.colorSchemes[i].green3 + "," + this.colorSchemes[i].blue3 + ")";
             var colorSum3 = Number(this.colorSchemes[i].red3) + Number(this.colorSchemes[i].green3 + Number(this.colorSchemes[i].blue3));
             if (colorSum3 > 382) {
               document.getElementById("box" + i + "3").style.color = "rgb(0,0,0)";
             }
             else {
               document.getElementById("box" + i + "3").style.color = "rgb(255,255,255)";
             }
             // var cs = this.colorSchemes[i];
             // var id = cs._id;
             // var self = this;
             // var index = i;
             // var idString = "delete" + i;
             //var button = document.getElementById(idString);
             //console.log(button);
             //button.addEventListener("click", function() { self.deleteColorScheme(cs, index, button, self, id); });
           }
         }
      } catch (error) {
        console.log(error);
      }
    },
    async saveColorScheme() {
      if (this.user != null) {
        try {
          let response = await axios.post("/api/colors", {
            username: this.user.username,
            name: this.name,
            red1: this.red1,
            green1: this.green1,
            blue1: this.blue1,
            red2: this.red2,
            green2: this.green2,
            blue2: this.blue2,
            red3: this.red3,
            green3: this.green3,
            blue3: this.blue3,
          });
          this.getColorSchemes();
        } catch (error) {
          console.log(error);
        }
      }
      else {
        this.toggleForm();
      }
    }
    // async deleteColorScheme(colorScheme) {
    //   try {
    //     console.log(colorScheme);
    //     let response = await axios.delete("/api/colors/" + colorScheme._id);
    //     this.getColorSchemes();
    //   } catch (error) {
    //   }
    // }
  }
});