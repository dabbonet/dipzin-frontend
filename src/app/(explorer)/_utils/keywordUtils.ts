import { storage } from "@/utils/storage";
import { mergeIconFromObject } from "@/utils/StringUtils";

const getNavigatorListIcon = (item: any) => {
  let url = "";
  switch (item.type) {
    case "app": {
      // Handle icon being either an object {hash, ext} or a string
      const iconValue = item.icon;
      if (iconValue && typeof iconValue === 'object' && iconValue.hash && iconValue.ext) {
        url = storage(mergeIconFromObject(iconValue));
      } else if (typeof iconValue === 'string') {
        url = storage(iconValue);
      } else {
        url = "/assets/icons/default-icon.svg";
      }
      break;
    }
    case "category":
      url = "/assets/icons/app-categories.svg";
      break;
    case "tag":
      url = "/assets/icons/screens.svg";
      break;
    case "marketing":
      url = "/assets/icons/marketing-pages.svg";
      break;
    case "flowAction":
      url = "/assets/icons/flows.svg";
      break;
    case "component":
      url = "/assets/icons/components.svg";
      break;
    default: {
      // Handle search results that may have icon nested under app object
      // or directly on the item (screens from search have app.app_icon)
      const iconValue = item.imgSrc || item.icon || item.app_icon || item.app?.app_icon;
      if (iconValue && typeof iconValue === 'object' && iconValue.hash && iconValue.ext) {
        url = storage(mergeIconFromObject(iconValue));
      } else if (typeof iconValue === 'string') {
        url = storage(iconValue);
      } else {
        url = "/assets/icons/default-icon.svg";
      }
      break;
    }
  }
  return url;
};

const getItemDescription = (item:any) => {
  let description = "";
  switch (item.type) {
    case "app":
      description = item.tag_line;
      break;
    case "category":
      description = `App Category`;
      break;
    case "tag":
      description = `Screen Tag`;
      break;
    case "flowAction":
      description = `Flow Action`;
      break;
    case "component":
      description = `Component`;
      break;
    default:
      description = `${item.type}`;
  }
  return description;
}

const mapItemPattern = (selectedResult: any) => {
  switch (selectedResult.id) {
    case 'appCategories':
      return 'categories';
    case 'tagCategories':
      return 'tags';
    case 'marketingCategories':
      return 'marketing';
    case 'componentCategories':
      return 'components';
    case 'flowCategories':
      return 'flows';
    default:
      return 'unknown'; // Fallback in case no matching category is found
  }
};

export {
  getNavigatorListIcon,
  getItemDescription,
  mapItemPattern
}
