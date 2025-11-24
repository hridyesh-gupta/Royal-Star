
'use client';

import { addToCart } from '../../lib/cart';
import { useState } from 'react';
import { useLanguage } from '../../components/LanguageProvider';

export default function MenuSection() {
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const { language } = useLanguage();

  const handleAddToCart = (
    item: any,
    categoryTitle: string,
    variant?: 'bottle' | 'glass'
  ) => {
    let price: string | undefined;

    if (variant === 'bottle' && item.price_bottle) {
      price = item.price_bottle;
    } else if (variant === 'glass' && item.price_glass) {
      price = item.price_glass;
    } else if (item.price) {
      price = item.price;
    }

    if (!price) return;

    const baseName = language === 'fr' && item.frname ? item.frname : item.name;

    let displayName = baseName;
    if (variant === 'bottle') {
      displayName = `${baseName} (${language === 'fr' ? 'Bouteille' : 'Bottle'})`;
    } else if (variant === 'glass') {
      displayName = `${baseName} (${language === 'fr' ? 'Verre' : 'Glass'})`;
    }

    const variantSuffix = variant ? `-${variant}` : '';

    const id = `${categoryTitle}-${item.name}${variantSuffix}`
      .replace(/\s+/g, '-')
      .toLowerCase();

    const cartItem = {
      id,
      name: displayName,
      price,
      category: categoryTitle,
    };

    addToCart(cartItem);

    // Show feedback
    setAddedItems((prev) => new Set(prev).add(id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }, 2000);
  };

  const foodCategories = [
    {
      "title": "Starters / Entrées",
      "items": [
        { "name": "Lentil Soup", "frname": "Soupe de lentilles", "description": "", "frdescription": "", "price": "CHF 9.00" },
        { "name": "Vegetable Soup", "frname": "Soupe de légumes", "description": "", "frdescription": "", "price": "CHF 9.00" },
        { "name": "Chicken Soup", "frname": "Soupe de poulet", "description": "", "frdescription": "", "price": "CHF 10.00" },

        { "name": "Vegetarian Samosa (2 pcs)", "frname": "Samosa végétarien", 
          "description": "Potatoes, peas", 
          "frdescription": "Pommes de terre, petits pois", 
          "price": "CHF 8.00" },

        { "name": "Chicken Samosa (2 pcs)", "frname": "Samosa au poulet", 
          "description": "Chicken, peas", 
          "frdescription": "Poulet, petits pois", 
          "price": "CHF 12.00" },

        { "name": "Mix Pakora (2 pcs)", "frname": "Beignets assortis (2 pcs)", "description": "", "frdescription": "", "price": "CHF 12.00" },
        { "name": "Natural yogurt", "frname": "", "description": "", "frdescription": "", "price": "CHF 5.00" },

        { "name": "Raita", "frname": "", 
          "description": "Yogurt, cucumbers, carrots", 
          "frdescription": "", 
          "price": "CHF 9.00" }
      ]
    },

    {
      "title": "Salads / Salades",
      "items": [
        { "name": "Green Salad", "frname": "Salade verte", "description": "", "frdescription": "", "price": "CHF 6.00" },
        { "name": "Punjabi Salad", "frname": "Salade punjabi", "description": "", "frdescription": "", "price": "CHF 12.00" },
        { "name": "Royal Salad", "frname": "Salade royale", "description": "", "frdescription": "", "price": "CHF 14.00" },
        { "name": "Mozzarella Salad", "frname": "Salade mozzarella", "description": "", "frdescription": "", "price": "CHF 14.00" }
      ]
    },

    {
      "title": "Vegetarian Dishes / Plats Végétariens",
      "items": [
        { "name": "Paneer Tikka Masala", "frname": "", "description": "", "frdescription": "", "price": "CHF 20.00" },

        { "name": "Mixed Vegetables", "frname": "Légumes mélangés", 
          "description": "", 
          "frdescription": "", 
          "price": "CHF 17.00" },

        { "name": "Vegetable Korma", "frname": "Korma de légumes", "description": "", "frdescription": "", "price": "CHF 20.00" },

        { "name": "Dal Tadka", "frname": "Lentilles sautées", 
          "description": "Stir fried lentils", 
          "frdescription": "Lentilles sautées", 
          "price": "CHF 18.00" },

        { "name": "Palak", "frname": "Épinards", 
          "description": "Spinach", 
          "frdescription": "Épinards", 
          "price": "CHF 18.00" },

        { "name": "Palak Paneer", "frname": "Épinards au fromage", 
          "description": "Spinach with cheese", 
          "frdescription": "Épinards au fromage", 
          "price": "CHF 22.00" },

        { "name": "Butter Paneer", "frname": "Paneer au beurre", 
          "description": "Paneer in buttery sauce", 
          "frdescription": "Paneer au beurre", 
          "price": "CHF 22.00" },

        { "name": "Dal Makhani", "frname": "Lentilles noires crémeuses et beurre", 
          "description": "Creamy black lentils with butter", 
          "frdescription": "Lentilles noires crémeuses et beurre", 
          "price": "CHF 20.00" },

        { "name": "Aloo Palak", "frname": "", 
          "description": "Spinach, potatoes", 
          "frdescription": "Épinards, pommes de terre", 
          "price": "CHF 20.00" }
      ]
    },

    {
      "title": "Seafood Prawns / Fruits de Mer Crevettes",
      "items": [
        { "name": "Prawns Curry", "frname": "Curry de crevettes", "description": "", "frdescription": "", "price": "CHF 30.00" },

        { "name": "Prawns Korma", "frname": "Crevettes korma", 
          "description": "Coconut sauce", 
          "frdescription": "Coconut, sauce", 
          "price": "CHF 35.00" },

        { "name": "Prawns Coco Curry", "frname": "Crevettes au curry coco", 
          "description": "Coconut curry prawns", 
          "frdescription": "Crevettes au curry coco", 
          "price": "CHF 35.00" }
      ]
    },

    {
      "title": "Chicken Dishes / Plats au Poulet",
      "items": [
        { "name": "Butter Chicken", "frname": "Poulet au beurre", 
          "description": "Grilled chicken with almonds, nuts, cashews", 
          "frdescription": "Poulet grillé, amandes, noix, cajou", 
          "price": "CHF 34.00" },

        { "name": "Chicken Tikka Masala", "frname": "Poulet tikka masala", 
          "description": "Cream and tomato sauce", 
          "frdescription": "Cream, à la tomate", 
          "price": "CHF 32.00" },

        { "name": "Chicken Korma", "frname": "Poulet korma", 
          "description": "Dry fruits, coconut, cream", 
          "frdescription": "dry fruits, coconut, cream", 
          "price": "CHF 32.00" },

        { "name": "Chicken Madras", "frname": "Poulet madras", 
          "description": "Spicy chicken curry", 
          "frdescription": "Spicy curry, poulet", 
          "price": "CHF 30.00" },

        { "name": "Chicken Karahi", "frname": "Poulet karahi", 
          "description": "Ginger, capsicum, lemon", 
          "frdescription": "Gingembre, poivron, citron", 
          "price": "CHF 32.00" },

        { "name": "Chicken Jalfrezi", "frname": "Poulet jalfrezi", 
          "description": "Spicy curry with onions and bell peppers", 
          "frdescription": "Spicy curry, onions, poivrons, sauce", 
          "price": "CHF 32.00" },

        { "name": "Chicken Curry", "frname": "Curry de poulet", 
          "description": "", 
          "frdescription": "", 
          "price": "CHF 28.00" }
      ]
    },
    {
      "title": "Lamb Dishes / Plats d'Agneau",
      "items": [
        { 
          "name": "Lamb Curry", 
          "frname": "Curry d'agneau", 
          "description": "", 
          "frdescription": "", 
          "price": "CHF 30.00" 
        },
        { 
          "name": "Lamb Karahi", 
          "frname": "Agneau karahi", 
          "description": "Onions, ginger, sauce, capsicum, lemon", 
          "frdescription": "Onions, ginger, sauce, capsicum, lemon", 
          "price": "CHF 35.00" 
        },
        { 
          "name": "Lamb Jalfrezi", 
          "frname": "Agneau jalfrezi", 
          "description": "Spicy sauce, onions, peppers", 
          "frdescription": "Spicy sauce, onions, poivrons", 
          "price": "CHF 36.00" 
        },
        { 
          "name": "Lamb Madras", 
          "frname": "Agneau madras", 
          "description": "", 
          "frdescription": "", 
          "price": "CHF 33.00" 
        },
        { 
          "name": "Lamb Korma", 
          "frname": "Agneau korma", 
          "description": "", 
          "frdescription": "", 
          "price": "CHF 35.00" 
        }
      ]
    },

    {
      "title": "Beef Dishes / Plats de Boeuf",
      "items": [
        { 
          "name": "Beef Curry", 
          "frname": "Curry de boeuf", 
          "description": "", 
          "frdescription": "", 
          "price": "CHF 30.00" 
        },
        { 
          "name": "Beef Karahi", 
          "frname": "Boeuf karahi", 
          "description": "Onions, ginger, sauce, capsicum, lemon", 
          "frdescription": "Onions, ginger, sauce, capsicum, lemon", 
          "price": "CHF 35.00" 
        },
        { 
          "name": "Beef Madras", 
          "frname": "Boeuf madras", 
          "description": "Spicy", 
          "frdescription": "Spicy", 
          "price": "CHF 33.00" 
        },
        { 
          "name": "Beef Korma", 
          "frname": "Boeuf korma", 
          "description": "Coconut sauce", 
          "frdescription": "Coconut, sauce", 
          "price": "CHF 35.00" 
        }
      ]
    },

    {
      "title": "Biryani / Riz basmati mijotés aux épices",
      "items": [
        { 
          "name": "Vegetable Biryani", 
          "frname": "Biryani de légumes", 
          "description": "Basmati rice, mixed vegetables", 
          "frdescription": "Basmati riz, mix légumes", 
          "price": "CHF 25.00" 
        },
        { 
          "name": "Chicken Biryani", 
          "frname": "Biryani de poulet", 
          "description": "Basmati rice, chicken", 
          "frdescription": "Basmati riz, poulet", 
          "price": "CHF 28.00" 
        },
        { 
          "name": "Lamb Biryani", 
          "frname": "Biryani d'agneau", 
          "description": "Basmati rice, lamb", 
          "frdescription": "Basmati riz, agneau", 
          "price": "CHF 32.00" 
        },
        { 
          "name": "Beef Biryani", 
          "frname": "Biryani de boeuf", 
          "description": "Basmati rice, beef", 
          "frdescription": "Basmati riz, boeuf", 
          "price": "CHF 32.00" 
        },
        { 
          "name": "Prawns Biryani", 
          "frname": "Biryani de crevettes", 
          "description": "Basmati rice, prawns", 
          "frdescription": "Basmati riz, prawns", 
          "price": "CHF 35.00" 
        }
      ]
    },

    {
      "title": "Rice / Riz",
      "items": [
        { "name": "Plain Basmati Rice", "frname": "Riz basmati nature", "description": "", "frdescription": "", "price": "CHF 5.00" },
        { "name": "Kashmiri Rice", "frname": "Riz du Cachemire", "description": "", "frdescription": "", "price": "CHF 7.00" },
        { "name": "Jeera Rice", "frname": "Riz au cumin", "description": "", "frdescription": "", "price": "CHF 6.00" },
        { "name": "Mutter Pulao", "frname": "Riz aux petits pois", "description": "Rice with peas", "frdescription": "Riz aux petits pois", "price": "CHF 7.00" },
        { "name": "Saffron Rice", "frname": "Riz au safran", "description": "Saffron flavored rice", "frdescription": "Riz au safran", "price": "CHF 7.00" }
      ]
    },

    {
      "title": "Naan (Indian Bread) / Pain Indien",
      "items": [
        { "name": "Plain Naan", "frname": "Naan nature", "description": "", "frdescription": "", "price": "CHF 5.00" },
        { "name": "Butter Naan", "frname": "Naan au beurre", "description": "", "frdescription": "", "price": "CHF 6.00" },
        { "name": "Cheese Naan", "frname": "Naan au fromage", "description": "", "frdescription": "", "price": "CHF 7.00" },
        { "name": "Garlic Naan", "frname": "Naan à l'ail", "description": "Garlic flavored naan", "frdescription": "Naan à l'ail", "price": "CHF 7.00" },
        { "name": "Chilli Naan", "frname": "Naan au piment", "description": "Chili flavored naan", "frdescription": "Naan au piment", "price": "CHF 7.00" }
      ]
    },

    {
      "title": "Desserts / Sweets",
      "items": [
        { "name": "Gulab Jamun (2 pieces)", "frname": "", "description": "", "frdescription": "", "price": "CHF 7.00" },
        { "name": "Suji Halwa", "frname": "", "description": "", "frdescription": "", "price": "CHF 7.00" }
      ]
    },
    {
      "title": "Hot Drinks / Boissons chaudes",
      "items": [
        { "name": "Coffee Espresso", "frname": "Café, Expresso", "description": "", "frdescription": "", "price": "CHF 3.50" },
        { "name": "Cappuccino", "frname": "Cappuccino", "description": "", "frdescription": "", "price": "CHF 4.50" },
        { "name": "Hot Tea", "frname": "Thé chaud", "description": "", "frdescription": "", "price": "CHF 3.50" },
        { "name": "Hot Chocolate", "frname": "Chocolat chaud, Renversé", "description": "", "frdescription": "", "price": "CHF 3.50" }
      ]
    },

    {
      "title": "Indian Lassi 25 cl / Lassi indiens 25 cl",
      "items": [
        { 
          "name": "Plain, Mint, Salt, Sweet Lassi", 
          "frname": "Lassi nature, Menthe, Salé, Sucré (plain, Mint, Salt, Suggar)", 
          "description": "", 
          "frdescription": "", 
          "price": "CHF 5.00" 
        },
        { 
          "name": "Mango Lassi", 
          "frname": "Lassi Mangue (Mango)", 
          "description": "", 
          "frdescription": "", 
          "price": "CHF 7.00" 
        }
      ]
    },

    {
      "title": "Cold Drinks Mineral 50 cl / Boissons froides minérales 50 cl",
      "items": [
        { "name": "Coca Cola (Classic, Zero)", "frname": "Coca cola classic, zero", "description": "", "frdescription": "", "price": "CHF 3.50" },
        { "name": "Sinalco", "frname": "Sinalco", "description": "", "frdescription": "", "price": "CHF 3.50" },
        { "name": "Fanta (red, Mango)", "frname": "Fanta red, mangue", "description": "", "frdescription": "", "price": "CHF 3.50" },
        { "name": "Sprite", "frname": "Sprite", "description": "", "frdescription": "", "price": "CHF 3.50" },
        { "name": "Sparkling Water", "frname": "Eau gazeuse (Sanpellegrino)", "description": "", "frdescription": "", "price": "CHF 3.50" },
        { "name": "Mineral Water (Evian)", "frname": "Eau minérale (Evian)", "description": "", "frdescription": "", "price": "CHF 3.50" },
        { "name": "Iced Tea Lemon Peach", "frname": "Thé froid, citron, pêche", "description": "", "frdescription": "", "price": "CHF 3.50" },
        { "name": "Schweppes Tonic Lemon", "frname": "Schweppes tonic, lemon", "description": "", "frdescription": "", "price": "CHF 3.50" },
        { 
          "name": "Orange Juice, Pineapple Juice, Peach Juice", 
          "frname": "Jus d’orange, jus d’ananas, jus de pêche", 
          "description": "Fruit Juice 20 cl", 
          "frdescription": "Jus et nectars de fruits 20 cl", 
          "price": "CHF 3.50" 
        },
        { 
          "name": "Pear Juice, Mango Juice", 
          "frname": "Jus de poire, jus de mangue", 
          "description": "Fruit Juice 20 cl", 
          "frdescription": "Jus et nectars de fruits 20 cl", 
          "price": "CHF 3.50" 
        },
        { 
          "name": "Apple Juice 33 cl", 
          "frname": "Jus de pomme 33 cl", 
          "description": "Fruit Juice 33 cl", 
          "frdescription": "Jus et nectars de fruits 33 cl", 
          "price": "CHF 3.50" 
        },
        { "name": "Red Bull", "frname": "Red Bull", "description": "Energy Drink 25 cl", "frdescription": "Boissons énergisantes 25 cl", "price": "CHF 3.00" },
        { "name": "Grenadine Syrup", "frname": "Sirop de grenadine", "description": "Moderate Priced Drinks 35 cl", "frdescription": "Boissons à prix modérés 35 cl", "price": "CHF 2.00" },
        { "name": "Mint Syrup", "frname": "Sirop à la menthe", "description": "Moderate Priced Drinks 35 cl", "frdescription": "Boissons à prix modérés 35 cl", "price": "CHF 2.00" },
        { "name": "Glass of Milk", "frname": "Verre de lait", "description": "Moderate Priced Drinks 35 cl", "frdescription": "Boissons à prix modérés 35 cl", "price": "CHF 2.50" }
      ]
    },
    {
      "title": "Beers Draft Bottle Can / Bières pression bouteille (B) et canette (C)",
      "items": [
        { "name": "Heineken Blonde 5% Netherlands 50 cl", "frname": "Heineken Blonde (C) – 5% Pays Bas – 50 cl", "description": "", "frdescription": "", "price": "CHF 3.50" },
        { "name": "Super Bock Blonde 5.2% Portugal 50 cl", "frname": "Super Bock Blonde (C) – 5.2% Portugal – 50 cl", "description": "", "frdescription": "", "price": "CHF 3.50" },
        { "name": "Super Bock Blonde 5.2% Portugal 33 cl", "frname": "Super Bock Blonde (C) – 5.2% Portugal – 33 cl", "description": "", "frdescription": "", "price": "CHF 2.50" },
        { "name": "1664 Blonde 5.5% France 50 cl", "frname": "1664 Blonde (B) – 5.5% France – 50 cl", "description": "", "frdescription": "", "price": "CHF 3.50" },
        { "name": "Kingfisher 4.8% India 33 cl", "frname": "kingfischer (B) – 4.8% Inde – 33 cl", "description": "", "frdescription": "", "price": "CHF 4.50" },
        { "name": "Super Bock Blonde 5.2% Portugal 25 cl", "frname": "Super Bock Blonde – 5.2% Portugal – 25 cl", "description": "Draft Beers 4° – 6°", "frdescription": "Bières pression (4° – 6°)", "price": "CHF 4.00" },
        { "name": "Super Bock Blonde 5.2% Portugal 50 cl", "frname": "Super Bock Blonde – 5.2% Portugal – 50 cl", "description": "Draft Beers 4° – 6°", "frdescription": "Bières pression (4° – 6°)", "price": "CHF 7.00" },
        { "name": "Feldschlösschen Lager Blonde Switzerland 33 cl", "frname": "Feldschlösschen Lager Blonde (B) Suisse – 33 cl", "description": "Non Alcoholic Beer", "frdescription": "Bière sans alcool", "price": "CHF 3.50" }
      ]
    },
    {
      "title": "Wines Bottle 75 cl / Vins bouteille 75 cl",
      "items": [
        {
          "name": "Pinot Blanc 13.5% 2024 Switzerland",
          "frname": "Pinot blanc 13,5% 2024 Suisse",
          "description": "White wine",
          "frdescription": "Vin blanc",
          "price_bottle": "CHF 32.00",
          "price_glass": "CHF 4.00"
        },
        {
          "name": "Chasselas Romand 12% 2023 Switzerland",
          "frname": "Chasselas Romand 12% 2023 Suisse",
          "description": "White wine",
          "frdescription": "Vin blanc",
          "price_bottle": "CHF 32.00",
          "price_glass": "CHF 4.00"
        },
        {
          "name": "Chardonnay Puglia 12.5% 2022 Italy",
          "frname": "Chardonnay Puglia 12.5% 2022 Italie",
          "description": "White wine",
          "frdescription": "Vin blanc",
          "price_bottle": "CHF 32.00",
          "price_glass": "CHF 4.00"
        },

        {
          "name": "Gamay Chablais 13.5% 2022 Switzerland",
          "frname": "Gamay Chablais 13,5% 2022 Suisse",
          "description": "Red wine",
          "frdescription": "Vin rouge",
          "price_bottle": "CHF 30.00",
          "price_glass": "CHF 4.00"
        },
        {
          "name": "Bordeaux Chateau 13.5% 2022 France",
          "frname": "Bordeaux Chateau 13,5% 2022 France",
          "description": "Red wine",
          "frdescription": "Vin rouge",
          "price_bottle": "CHF 30.00",
          "price_glass": "CHF 4.00"
        },
        {
          "name": "Pinot Noir Belles Filles 13% 2023 Switzerland",
          "frname": "Pinot Noir Belles Filles 13% 2023 Suisse",
          "description": "Red wine",
          "frdescription": "Vin rouge",
          "price_bottle": "CHF 28.00",
          "price_glass": "CHF 4.00"
        },

        {
          "name": "Oeil de Perdrix Belles Filles 12% 2024 Switzerland",
          "frname": "Oeil de Perdrix Belles Filles 12% 2024 Suisse",
          "description": "Rose wine",
          "frdescription": "Vin rosé",
          "price_bottle": "CHF 30.00",
          "price_glass": "CHF 4.00"
        },
        {
          "name": "Munity Côte de Provence 13% 2024 France",
          "frname": "Munity Cote de prov 13% 2024 France",
          "description": "Rose wine",
          "frdescription": "Vin rosé",
          "price_bottle": "CHF 28.00",
          "price_glass": "CHF 4.00"
        },
        {
          "name": "Les Fantastiques Bio 13% 2024 France",
          "frname": "Les Fantastiques Bio 13% 2024 France",
          "description": "Rose wine",
          "frdescription": "Vin rosé",
          "price_bottle": "CHF 32.00",
          "price_glass": "CHF 4.00"
        }
      ]
    },

    {
      "title": "Spirits Digestifs Bottle 70 cl / Spiritueux Digestifs bouteille 70 cl",
      "items": [
        {
          "name": "Ballantines Red Label 40% Scotland",
          "frname": "Ballantines Red Label 40% Ecosse",
          "description": "Whiskies",
          "frdescription": "Whiskies",
          "price_bottle": "CHF 50.00",
          "price_glass": "CHF 8.00"
        },
        {
          "name": "Jack Daniels 40% USA",
          "frname": "Jack Daniels 40% USA",
          "description": "Whiskies",
          "frdescription": "Whiskies",
          "price_bottle": "CHF 75.00",
          "price_glass": "CHF 10.00"
        },
        {
          "name": "Chivas Regal 12 years 40% Scotland",
          "frname": "Chivas Regal 12 ans 40% Ecosse",
          "description": "Whiskies",
          "frdescription": "Whiskies",
          "price_bottle": "CHF 85.00",
          "price_glass": "CHF 12.00"
        },

        {
          "name": "Smirnoff 37.5% USA",
          "frname": "Smirnoff 37,5% USA",
          "description": "Vodkas",
          "frdescription": "Vodkas",
          "price_bottle": "CHF 70.00",
          "price_glass": "CHF 10.00"
        },
        {
          "name": "Absolut 40% Sweden",
          "frname": "Absolut 40% Suède",
          "description": "Vodkas",
          "frdescription": "Vodkas",
          "price_bottle": "CHF 75.00",
          "price_glass": "CHF 10.00"
        },

        {
          "name": "Bombay Sapphire 40% England",
          "frname": "Bombay Sapphire 40% Angleterre",
          "description": "Gins",
          "frdescription": "Gins",
          "price_bottle": "CHF 80.00",
          "price_glass": "CHF 12.00"
        },
        {
          "name": "Hendricks 41.4% Scotland",
          "frname": "Hendricks 41,4% Ecosse",
          "description": "Gins",
          "frdescription": "Gins",
          "price_bottle": "CHF 90.00",
          "price_glass": "CHF 13.00"
        },
        {
          "name": "Gordons Dry 37.5% England",
          "frname": "Gordons dry 37,5% Angleterre",
          "description": "Gins",
          "frdescription": "Gins",
          "price_bottle": "CHF 50.00",
          "price_glass": "CHF 8.00"
        },

        {
          "name": "Havana Club Especial 37.5% Cuba",
          "frname": "Havana Club Especial 37,5% Cuba",
          "description": "Rum - Tequila",
          "frdescription": "Rhum - Tequila",
          "price_bottle": "CHF 55.00",
          "price_glass": "CHF 8.00"
        },
        {
          "name": "Tequila Sierra Silver 38% Mexico",
          "frname": "Tequila Sierra Silver 38% Mexique",
          "description": "Rum - Tequila",
          "frdescription": "Rhum - Tequila",
          "price_bottle": "CHF 75.00",
          "price_glass": "CHF 10.00"
        }
      ]
    },

    {
      "title": "Cocktails with or without alcohol 25 cl / Cocktails avec ou sans alcool verre 25 cl",
      "items": [
        {
          "name": "Spritz",
          "frname": "Spritz",
          "description": "6 cl prosecco, 4 cl aperol, 2 cl sparkling water, ice and slice of red",
          "frdescription": "6 cl prosecco, 4 cl aperol, 2 cl eau gazeuse, glaçons et tranche d’red",
          "price": "CHF 10.00"
        },
        {
          "name": "Hugo",
          "frname": "Hugo",
          "description": "6 cl prosecco, 4 cl sparkling water, 2 cl syrup, mint leaf and lime",
          "frdescription": "6 cl prosecco, 4 cl eau gazeuse, 2 cl de sirop, feuille de menthe et citron vert",
          "price": "CHF 10.00"
        },
        {
          "name": "Tequila Sunrise",
          "frname": "Tequila Sunrise",
          "description": "6 cl tequila, 12 cl red juice, 2 cl grenadine, slice of red",
          "frdescription": "6 cl tequila, 12 cl jus d’red, 2 cl grenadine et tranche d’red",
          "price": "CHF 12.00"
        },
        {
          "name": "Negroni",
          "frname": "Negroni",
          "description": "3 cl gin, 3 cl campari, 3 cl red vermouth, ice and red zest",
          "frdescription": "3 cl gin, 3 cl campari, 3 cl vermouth rouge, glaçons et zeste d’red",
          "price": "CHF 10.00"
        },
        {
          "name": "Mojito",
          "frname": "Mojito",
          "description": "6 cl rum, mint, 2 cl cane syrup, half lime, sparkling water and ice",
          "frdescription": "6 cl rhum, menthe, 2 cl sirop canne, ½ citron vert, eau gazeuse et glaçons",
          "price": "CHF 10.00"
        },
        {
          "name": "Piña Colada",
          "frname": "Piña colada",
          "description": "6 cl rum, 10 cl pineapple juice, 4 cl coconut cream, ice and pineapple slice",
          "frdescription": "6 cl rhum, 10 cl jus ananas, 4 cl crème coco, glaçons et tranche ananas",
          "price": "CHF 13.00"
        },
        {
          "name": "Caipirinha",
          "frname": "Caipirinha",
          "description": "6 cl cachaça, 1 lime, 2 teaspoons sugar, crushed ice",
          "frdescription": "6 cl cachaça, 1 citron vert, 2 cuillères à café de sucre de canne et glaçons",
          "price": "CHF 12.00"
        },
        {
          "name": "Gin Tonic",
          "frname": "Gin Tonic",
          "description": "5 cl gin, 10 cl schweppes, ice and slice of lemon",
          "frdescription": "5 cl de gin, 10 cl de schweppes tonic, glaçons et une tranche de citron",
          "price": "CHF 12.00"
        },
        {
          "name": "Margarita",
          "frname": "Margarita",
          "description": "5 cl tequila, 3 cl triple sec, 3 cl lemon juice, ice and salted rim",
          "frdescription": "5 cl tequila, 3 cl triple sec, 3 cl jus citron vert, glaçons et bord verre salé",
          "price": "CHF 10.00"
        },

        {
          "name": "Nojito (non alcoholic)",
          "frname": "Nojito",
          "description": "Mint leaves, lime, cane syrup, sparkling water and ice",
          "frdescription": "Feuilles de menthe, citron vert, sirop de canne, eau gazeuse et glaçons",
          "price": "CHF 9.00"
        },
        {
          "name": "Bora Bora (non alcoholic)",
          "frname": "Bora Bora",
          "description": "Pineapple juice, passion fruit, grenadine, ice and red slice",
          "frdescription": "Jus ananas et fruit passion, grenadine, glaçons et tranche d’red",
          "price": "CHF 9.00"
        }
      ]
    }
  ]

  const beverageCategoryTitles = [
    "Hot Drinks / Boissons chaudes",
    "Indian Lassi 25 cl / Lassi indiens 25 cl",
    "Cold Drinks Mineral 50 cl / Boissons froides minérales 50 cl",
    "Beers Draft Bottle Can / Bières pression bouteille (B) et canette (C)",
    "Spirits Digestifs Bottle 70 cl / Spiritueux Digestifs bouteille 70 cl",
    "Cocktails with or without alcohol 25 cl / Cocktails avec ou sans alcool verre 25 cl",
  ];

  const wineCategoryTitles = [
    "Wines Bottle 75 cl / Vins bouteille 75 cl",
  ];

  const beverageCategories = foodCategories.filter((category) =>
    beverageCategoryTitles.includes(category.title)
  );

  const wineCategories = foodCategories.filter((category) =>
    wineCategoryTitles.includes(category.title)
  );

  const displayFoodCategories = foodCategories.filter(
    (category) =>
      !beverageCategoryTitles.includes(category.title) &&
      !wineCategoryTitles.includes(category.title)
  );

  const getCategoryTitles = (rawTitle: string) => {
    if (!rawTitle) {
      return { en: "", fr: "" };
    }

    const parts = rawTitle.split("/");
    if (parts.length < 2) {
      const trimmed = rawTitle.trim();
      return { en: trimmed, fr: trimmed };
    }

    const [enPartRaw, frPartRaw] = parts;
    const enPart = enPartRaw.trim();
    const frPart = frPartRaw.trim();

    return {
      en: enPart || rawTitle,
      fr: frPart || enPart || rawTitle,
    };
  };

  const renderItem = (item: any, idx: number, categoryTitle: string) => {
    if (!item || !item.name) {
      console.warn('Menu item missing required fields:', item);
      return null;
    }

    const baseId = `${categoryTitle}-${item.name}`.replace(/\s+/g, '-').toLowerCase();
    const itemId = baseId;
    const bottleId = `${baseId}-bottle`;
    const glassId = `${baseId}-glass`;

    const isAdded = addedItems.has(itemId);
    const isBottleAdded = addedItems.has(bottleId);
    const isGlassAdded = addedItems.has(glassId);

    const displayName = item.name;
    const displayDescription = language === 'fr' && item.frdescription ? item.frdescription : item.description;

    const isBottleOnlyCategory =
      categoryTitle === 'Wines Bottle 75 cl' ||
      categoryTitle === 'Spirits Digestifs Bottle 70 cl';

    const hasVariants = !!(item.price_bottle || item.price_glass);

    return (
      <div
        key={idx}
        className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 border-b pb-2 last:border-b-0 last:pb-0"
      >
        <div className="flex-1">
          <p className="font-semibold text-red-900">{displayName}</p>
          {displayDescription && <p className="text-sm text-gray-600">{displayDescription}</p>}
        </div>
        <div className="flex items-center gap-3 flex-wrap justify-end">
          {!hasVariants && item.price && (
            <>
              <p className="font-medium text-red-800 whitespace-nowrap">{item.price}</p>
              <button
                onClick={() => handleAddToCart(item, categoryTitle)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isAdded
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {isAdded ? (
                  <span className="flex items-center gap-1">
                    <i className="ri-check-line"></i>
                    {language === 'fr' ? 'Ajouté' : 'Added'}
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    <i className="ri-add-line"></i>
                    {language === 'fr' ? 'Ajouter' : 'Add'}
                  </span>
                )}
              </button>
            </>
          )}

          {hasVariants && (
            <>
              {item.price_bottle && (
                <div className="flex items-center gap-2">
                  <p className="font-medium text-red-800 whitespace-nowrap">
                    {item.price_bottle} {language === 'fr' ? '(Bouteille)' : '(Bottle)'}
                  </p>
                  <button
                    onClick={() => handleAddToCart(item, categoryTitle, 'bottle')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isBottleAdded
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                  >
                    {isBottleAdded ? (
                      <span className="flex items-center gap-1">
                        <i className="ri-check-line"></i>
                        {language === 'fr' ? 'Ajouté' : 'Added'}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <i className="ri-add-line"></i>
                        {language === 'fr' ? 'Ajouter' : 'Add'}
                      </span>
                    )}
                  </button>
                </div>
              )}

              {!isBottleOnlyCategory && item.price_glass && (
                <div className="flex items-center gap-2">
                  <p className="font-medium text-red-800 whitespace-nowrap">
                    {item.price_glass} {language === 'fr' ? '(4 cl)' : '(4 cl)'}
                  </p>
                  <button
                    onClick={() => handleAddToCart(item, categoryTitle, 'glass')}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
                      isGlassAdded
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 hover:bg-red-600 text-white'
                    }`}
                  >
                    {isGlassAdded ? (
                      <span className="flex items-center gap-1">
                        <i className="ri-check-line"></i>
                        {language === 'fr' ? 'Verre ajouté' : 'Glass added'}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <i className="ri-add-line"></i>
                        {language === 'fr' ? 'Ajouter verre' : 'Add glass'}
                      </span>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-br from-red-50 to-red-50 py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-red-900 mb-6" style={{ fontFamily: 'var(--font-pacifico)' }}>
            {language === 'fr' ? 'Notre carte complète' : 'Our Complete Menu'}
          </h2>
          <p className="text-xl text-red-800 max-w-3xl mx-auto">
            {language === 'fr'
              ? 'Cuisine indienne authentique avec hospitalité suisse. Ajoutez vos plats préférés au panier et profitez de nos délicieuses spécialités.'
              : 'Authentic Indian cuisine with Swiss hospitality. Add your favorite dishes to cart and enjoy our delicious offerings.'}
          </p>
        </div>

        {/* Food Items Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-red-900 mb-4" style={{ fontFamily: 'var(--font-pacifico)' }}>
              {language === 'fr' ? 'Plats' : 'Food Items'}
            </h3>
            <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12">
            {displayFoodCategories.map((category, idx) => {
              const { en: titleEn, fr: titleFr } = getCategoryTitles(category.title);
              const displayTitle = language === 'fr' ? titleFr : titleEn;

              return (
                <div key={idx} className="bg-white rounded-2xl shadow-lg p-8">
                  <h4 className="text-2xl font-bold text-red-900 mb-6 text-center" style={{ fontFamily: 'var(--font-pacifico)' }}>
                    {displayTitle}
                  </h4>

                  <div className="space-y-4">
                    {Array.isArray(category.items)
                      ? category.items.map((item, itemIdx) => renderItem(item, itemIdx, titleEn))
                      : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Beverages Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-red-900 mb-4" style={{ fontFamily: 'var(--font-pacifico)' }}>
              {language === 'fr' ? 'Boissons & Spiritueux' : 'Beverages & Spirits'}
            </h3>
            <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12">
            {beverageCategories.map((category, idx) => {
              const { en: titleEn, fr: titleFr } = getCategoryTitles(category.title);
              const displayTitle = language === 'fr' ? titleFr : titleEn;

              return (
                <div key={idx} className="bg-white rounded-2xl shadow-lg p-8">
                  <h4 className="text-2xl font-bold text-red-900 mb-6 text-center" style={{ fontFamily: 'var(--font-pacifico)' }}>
                    {displayTitle}
                  </h4>

                  <div className="space-y-4">
                    {Array.isArray(category.items)
                      ? category.items.map((item, itemIdx) => renderItem(item, itemIdx, titleEn))
                      : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Wines Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-red-900 mb-4" style={{ fontFamily: 'var(--font-pacifico)' }}>
              {language === 'fr' ? 'Sélection de vins premium' : 'Premium Wine Collection'}
            </h3>
            <div className="w-24 h-1 bg-red-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-12">
            {wineCategories.map((category, idx) => {
              const { en: titleEn, fr: titleFr } = getCategoryTitles(category.title);
              const displayTitle = language === 'fr' ? titleFr : titleEn;

              return (
                <div key={idx} className="bg-white rounded-2xl shadow-lg p-8">
                  <h4 className="text-2xl font-bold text-red-900 mb-6 text-center" style={{ fontFamily: 'var(--font-pacifico)' }}>
                    {displayTitle}
                  </h4>

                  <div className="space-y-4">
                    {Array.isArray(category.items)
                      ? category.items.map((item, itemIdx) => renderItem(item, itemIdx, titleEn))
                      : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}