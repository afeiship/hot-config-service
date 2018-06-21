import NxWeappRequest from 'next-weapp-request';
import nx from 'next-js-core2';


const Http = nx.declare({
  extends: NxWeappRequest,
  methods: {
    contentType: function () {
      return nx.contentType('json');
    },
    toData: function (inResponse) {
      return inResponse.data.data;
    }
  }
});

export default Http.getInstance();
