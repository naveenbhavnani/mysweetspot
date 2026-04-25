import "dotenv/config";
import amazonPaapi from "amazon-paapi";

const commonParameters = {
  AccessKey: process.env.AMAZON_PA_API_ACCESS_KEY,
  SecretKey: process.env.AMAZON_PA_API_SECRET_KEY,
  PartnerTag: process.env.AMAZON_PA_API_PARTNER_TAG,
  PartnerType: "Associates",
  Marketplace: "www.amazon.in",
};

const requestParameters = {
  ItemIds: ["B0BQJWC29R", "B09V28FDF8", "B0BF5KNYWH", "B0BNHGQCSZ", "B0F42LLGC7", "B083FSTKC1", "B0DTYKNWLM"],
  ItemIdType: "ASIN",
  Condition: "New",
  Resources: [
    "ItemInfo.Title",
    "ItemInfo.Features",
    "ItemInfo.ProductInfo",
    "ItemInfo.TechnicalInfo",
    "ItemInfo.ManufactureInfo",
    "Offers.Listings.Price",
    "Images.Primary.Large",
    "Images.Variants.Large",
    "BrowseNodeInfo.BrowseNodes",
  ],
};

const data = await amazonPaapi.GetItems(commonParameters, requestParameters);
console.log(JSON.stringify(data.ItemsResult.Items, null, 2));
