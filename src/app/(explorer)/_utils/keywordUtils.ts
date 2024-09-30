import { storage } from "@/utils/storage";

const getNavigatorListIcon = (item:any) => {
  let url = "";
  switch (item.type) {
    case "app":
      url = storage(item.icon);
      break;
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
  }
  return url;
}


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
      return 'apps';
    case 'tagCategories':
      return 'screens';
    case 'marketingCategories':
      return 'marketing';
    case 'componentCategories':
      return 'components';
    case 'flowCategories':
      return 'flows';
    default:
      return '';
  }
}




export {
  getNavigatorListIcon,
  getItemDescription,
  mapItemPattern
}


