const USER =
  'Select TOP (1000) [MerchantId],[FirstName],[LastName],[PhoneNumber],' +
  '[Email],[AppUserId],[DateCreated],[PushNotificationsEnabled],[EmailNotificationsEnabled] FROM [Merchant] WHERE MerchantId = 1';

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

module.exports = { USER, ACCEPTED_OFFERS, OFFERS };
