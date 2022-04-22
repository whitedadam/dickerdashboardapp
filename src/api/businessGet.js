// const [businessesLoading, setBusinessesLoading] = useState(false);

// const axiosGet = async () => {
//     // Setting state variable to merchantId state variable to pass as request.
//     let merchant = merchantId;
//     try {
//       // Pulling Businesses Associated with merchant user
//       setBusinessesLoading(true);
//       let businessesResponse = await axios.get("/api/businesses", {
//         merchant,
//       });
//       setBusinessesLoading(false);
//       let businessInfo = businessesResponse.data;
//       console.log(businessInfo);
//       setBusinesses(businessInfo);
//       setUserAuth(true);
//     } catch (err) {
//       // Resetting variables to ensure nothing sneaks through
//       setUserAuth(false);
//       setIsAdmin(false);
//       setMerchantId(0);
//       alert(
//         "There was an error in grabbing your business data, please try to login again!"
//       );
//     }
//   };

//       // axiosGet();
