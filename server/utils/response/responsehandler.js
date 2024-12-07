class Apiresponse {
  constructor(message = "Something went wrong", success = false, data = null) {
    this.message = message;
    this.success = success;
    this.data = data;
  }
}
export default Apiresponse;
