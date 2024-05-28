import axios from 'axios';
export default {
  name : 'Home',
  data() {
    return {
      message: "ok"
    };
  },
  async created() {
    this.message = await axios.get('http://localhost:3000/message');
  }
};