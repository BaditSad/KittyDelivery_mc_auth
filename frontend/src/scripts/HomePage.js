import HomePage from '@/components/HomePage.vue'
import axios from 'axios';
export default {
  name: 'HomeView',
  components: {
    HomePage
  }
  ,
  async created() {
    this.message = await axios.get('http://localhost:3000/message');
  }
};

