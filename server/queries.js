const USER =
  'Select TOP (1000) [MerchantId],[FirstName],[LastName],[PhoneNumber],' +
  '[Email],[AppUserId],[DateCreated],[PushNotificationsEnabled],' +
  '[EmailNotificationsEnabled] FROM [Merchant] WHERE MerchantId = 1';

const ACCEPTED_OFFERS =
  'SELECT TOP (1000) [AcceptedOfferId],[OfferCode],[ExpirationDateTime],' +
  '[IsRedeemed],[Business_FK],[Offer_FK],[SubCategory_FK],[Consumer_FK],' +
  '[SubCategory_FK],[Wildcard],[DirectDICKER],[InGrid],[Win],[Created],[Discount]' +
  ',[Updated] FROM [AcceptedOffer]';

const OFFERS =
  'SELECT TOP (1000) [OfferId],[Disclaimer],[TargetDiscountPct],[LowestDiscountPct]' +
  ',[HighestDiscountPct],[StartingDate],[EndingDate],[IsActive],[DateTimeCreated],' +
  '[DateTimeUpdated],[Friday],[InitialQuantity],[Monday],[QuantityRemaining],' +
  '[Saturday],[Sunday],[Thursday],[Tuesday],[Wednesday],[Business_FK],[DirectDICKER],[Wildcard],[SubCategory_FK],[InGrid] FROM [Offer]';

const SUBCATEGORIES =
  'SELECT TOP (1000) [SubCategoryId],[SubCategoryName],[Category_FK] FROM [SubCategory]';

const BUSINESSES = 
  'SELECT TOP (1000) [BusinessId],[BusinessName],[StreetAddress1],[StreetAddress2]' +
  ',[City],[State],[ZipCode],[BusinessPhone],[BusinessEmail],[DateTimeCreated],[DateTimeUpdated]' +
  ',[Merchant_FK],[BusinessCode],[CategoryId],[SubCategoryId] FROM [dbo].[Business]' +
  ' WHERE Merchant_FK = 1';

module.exports = { USER, ACCEPTED_OFFERS, OFFERS, SUBCATEGORIES, BUSINESSES };
