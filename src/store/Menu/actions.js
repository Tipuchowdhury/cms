import {
  GET_AVAILABLE_MENU_BY_BRANCH_ID,
  GET_AVAILABLE_MENU_BY_BRANCH_ID_FRESH,
} from "./actionTypes"
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { convertToFormData, convertToQueryParams } from "helpers/functions"

export const getAvailableMenuByBranchId = branch_id => {
  const mockData = [
    {
      _id: "ecb1e040-6c09-4710-8833-148d5bc58969",
      menu_name: "Classic Margherita",
      menu_price: 199,
      pickup_menu_price: 199,
      variation_group_name: "Variation Group Name",
      variation_group_desc: "Variation Group Name",
      has_variation: 0,
      image:
        "https://imagesandfilesbucket.theecotek.com/Classic Margherita.jpg",
      variations: [],
    },
    {
      _id: "642252cc-8b1e-491f-a169-3b7fd1ca05e1",
      menu_name: "Baked-Chicken Arabiatta",
      menu_price: 450,
      pickup_menu_price: 440,
      variation_group_name: "Variation Group Name",
      variation_group_desc: "Variation Group Name",
      has_variation: 0,
      image:
        "https://imagesandfilesbucket.theecotek.com/Baked-Chicken Mushroom.jpeg",
      variations: [],
    },
    {
      _id: "d028aa83-75c0-4b2c-bb82-48ea3858f714",
      menu_name: "Chicken Arabiatta",
      menu_price: 529,
      pickup_menu_price: 429,
      variation_group_name: "Variation Group Name",
      variation_group_desc: "Variation Group Name",
      has_variation: 0,
      variations: [],
    },
    {
      _id: "13310133-708d-4b5d-81ab-afbcfe98469b",
      menu_name: "Deep Sea Fantasy Pizza",
      menu_price: 295,
      pickup_menu_price: 250,
      variation_group_name: "Variation data",
      variation_group_desc: "variation data description",
      has_variation: 1,
      image:
        "https://imagesandfilesbucket.theecotek.com/deep sea fantasi pizza.jpg",
      variations: [
        {
          _id: "db6eb0a2-1ac3-4ee1-aeb2-1d7eb12080a4",
          menu_id: "13310133-708d-4b5d-81ab-afbcfe98469b",
          variation_name: "Smalll",
          variation_price: 295,
          variation_group_desc: "group data description 1",
          variation_group_name: "group data 1",
          add_on: false,
          is_active: true,
          add_on_categories: [
            {
              _id: "bd54912a-85cb-487e-bcce-89b5268fc2d6",
              add_on_category_id: "8217326d-b62f-46c3-91c9-5a4a3cae8879",
              variation_id: "db6eb0a2-1ac3-4ee1-aeb2-1d7eb12080a4",
              add_on_category_name: "Choice of Crust",
              cat_is_multiple: false,
              cat_max_choice: 1,
              language_slug: "en",
              add_on_category_desc: "Select 1",
              add_ons: [
                {
                  _id: "7dd90c3a-ae48-41ec-ba45-290a1f805753",
                  add_ons_name: "Thin",
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 0,
                  addoncat_id: "8217326d-b62f-46c3-91c9-5a4a3cae8879",
                  variation_and_add_on_category_id:
                    "bd54912a-85cb-487e-bcce-89b5268fc2d6",
                },
                {
                  _id: "89569d4f-b938-43c3-9d30-6eef6bf147e5",
                  add_ons_name: " Medium",
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 0,
                  addoncat_id: "8217326d-b62f-46c3-91c9-5a4a3cae8879",
                  variation_and_add_on_category_id:
                    "bd54912a-85cb-487e-bcce-89b5268fc2d6",
                },
                {
                  _id: "922c8bc3-16bb-4b04-af1a-da6434635b9d",
                  add_ons_name: " Thick",
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 0,
                  addoncat_id: "8217326d-b62f-46c3-91c9-5a4a3cae8879",
                  variation_and_add_on_category_id:
                    "bd54912a-85cb-487e-bcce-89b5268fc2d6",
                },
              ],
            },
            {
              _id: "0af51ea3-2d58-424c-89d1-946326934bd4",
              add_on_category_id: "d8c3aaea-6fcb-482d-ab09-b25758ef2d8b",
              variation_id: "db6eb0a2-1ac3-4ee1-aeb2-1d7eb12080a4",
              add_on_category_name: 'Add Ons for 7" Pizza',
              cat_is_multiple: false,
              cat_max_choice: 2,
              language_slug: "en",
              add_on_category_desc: "Select up to 2 (optional)",
              add_ons: [
                {
                  _id: "02139d9f-4702-48bc-ad0a-352d7d9656d4",
                  add_ons_name: "More Toppings",
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 49,
                  addoncat_id: "d8c3aaea-6fcb-482d-ab09-b25758ef2d8b",
                  variation_and_add_on_category_id:
                    "0af51ea3-2d58-424c-89d1-946326934bd4",
                },
                {
                  _id: "33997ecf-22b2-40ad-ad4f-9f7d77758818",
                  add_ons_name: "More Cheese",
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 79,
                  addoncat_id: "d8c3aaea-6fcb-482d-ab09-b25758ef2d8b",
                  variation_and_add_on_category_id:
                    "0af51ea3-2d58-424c-89d1-946326934bd4",
                },
                {
                  _id: "d7a1fe33-1c80-4c5b-b9fa-e9caf17506c3",
                  add_ons_name: 'Sausage Crust 7"',
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 39,
                  addoncat_id: "d8c3aaea-6fcb-482d-ab09-b25758ef2d8b",
                  variation_and_add_on_category_id:
                    "0af51ea3-2d58-424c-89d1-946326934bd4",
                },
              ],
            },
          ],
        },
        {
          _id: "acc08d7b-881c-46dd-9c59-77716bd45053",
          menu_id: "13310133-708d-4b5d-81ab-afbcfe98469b",
          variation_name: "Large",
          variation_price: 605,
          variation_group_desc: "group data description 3",
          variation_group_name: "group data 3",
          add_on: false,
          is_active: true,
          add_on_categories: [
            {
              _id: "dfeedddb-6100-45d8-94b8-0ca74619f7de",
              add_on_category_id: "7d37fe5f-0155-4dc4-a502-eb9580299f66",
              variation_id: "acc08d7b-881c-46dd-9c59-77716bd45053",
              add_on_category_name: 'Add Ons for 12" Pizza',
              cat_is_multiple: true,
              cat_max_choice: 2,
              language_slug: "en",
              add_on_category_desc: "Select up to 2 (optional)",
              add_ons: [
                {
                  _id: "e4f1588b-f554-4532-a0df-469b3750191e",
                  add_ons_name: "More Naga",
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 109,
                  addoncat_id: "7d37fe5f-0155-4dc4-a502-eb9580299f66",
                  variation_and_add_on_category_id:
                    "dfeedddb-6100-45d8-94b8-0ca74619f7de",
                },
                {
                  _id: "e2f0fe5d-f303-4a58-a045-c6486472e5cc",
                  add_ons_name: "More Cheese",
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 199,
                  addoncat_id: "7d37fe5f-0155-4dc4-a502-eb9580299f66",
                  variation_and_add_on_category_id:
                    "dfeedddb-6100-45d8-94b8-0ca74619f7de",
                },
                {
                  _id: "39e85f1f-0d08-4eb0-acb0-cd3c6cd0740c",
                  add_ons_name: 'Sausage Crust 12"',
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 149,
                  addoncat_id: "7d37fe5f-0155-4dc4-a502-eb9580299f66",
                  variation_and_add_on_category_id:
                    "dfeedddb-6100-45d8-94b8-0ca74619f7de",
                },
              ],
            },
            {
              _id: "f675d544-23cb-4546-aaad-8499233326ae",
              add_on_category_id: "8217326d-b62f-46c3-91c9-5a4a3cae8879",
              variation_id: "acc08d7b-881c-46dd-9c59-77716bd45053",
              add_on_category_name: "Choice of Crust",
              cat_is_multiple: true,
              cat_max_choice: 1,
              language_slug: "en",
              add_on_category_desc: "Select 1",
              add_ons: [
                {
                  _id: "6342a2b9-8ea4-4f4b-bd5a-6b11f42b1fcd",
                  add_ons_name: " Thick",
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 10,
                  addoncat_id: "8217326d-b62f-46c3-91c9-5a4a3cae8879",
                  variation_and_add_on_category_id:
                    "f675d544-23cb-4546-aaad-8499233326ae",
                },
                {
                  _id: "850c5f1b-8dbd-4e00-9637-750aa4fdc28d",
                  add_ons_name: " Medium",
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 98,
                  addoncat_id: "8217326d-b62f-46c3-91c9-5a4a3cae8879",
                  variation_and_add_on_category_id:
                    "f675d544-23cb-4546-aaad-8499233326ae",
                },
                {
                  _id: "cbb150e2-e204-4e5e-ab8b-f08effa6ee35",
                  add_ons_name: "Thin",
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 10,
                  addoncat_id: "8217326d-b62f-46c3-91c9-5a4a3cae8879",
                  variation_and_add_on_category_id:
                    "f675d544-23cb-4546-aaad-8499233326ae",
                },
              ],
            },
          ],
        },
        {
          _id: "bbb7fbfb-e0f0-4639-8400-f7464857939e",
          menu_id: "13310133-708d-4b5d-81ab-afbcfe98469b",
          variation_name: "Medium",
          variation_price: 415,
          variation_group_desc: "group data description 2",
          variation_group_name: "group data 2",
          add_on: false,
          is_active: true,
          add_on_categories: [
            {
              _id: "59f28cbf-89f2-434d-927d-051c67af5fe6",
              add_on_category_id: "8217326d-b62f-46c3-91c9-5a4a3cae8879",
              variation_id: "bbb7fbfb-e0f0-4639-8400-f7464857939e",
              add_on_category_name: "Choice of Crust",
              cat_is_multiple: true,
              cat_max_choice: 1,
              language_slug: "en",
              add_on_category_desc: "Select 1",
              add_ons: [
                {
                  _id: "2afd919e-9fd8-451a-b4c2-081fb7d9dcc7",
                  add_ons_name: " Thick",
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 1,
                  addoncat_id: "8217326d-b62f-46c3-91c9-5a4a3cae8879",
                  variation_and_add_on_category_id:
                    "59f28cbf-89f2-434d-927d-051c67af5fe6",
                },
                {
                  _id: "ef272a90-5c05-4eb4-8114-be8f92bb9ec6",
                  add_ons_name: " Medium",
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 1,
                  addoncat_id: "8217326d-b62f-46c3-91c9-5a4a3cae8879",
                  variation_and_add_on_category_id:
                    "59f28cbf-89f2-434d-927d-051c67af5fe6",
                },
                {
                  _id: "7cb33bed-df64-48bb-9fcd-f9aad56c666c",
                  add_ons_name: "Thin",
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 1,
                  addoncat_id: "8217326d-b62f-46c3-91c9-5a4a3cae8879",
                  variation_and_add_on_category_id:
                    "59f28cbf-89f2-434d-927d-051c67af5fe6",
                },
              ],
            },
            {
              _id: "2ee41c89-12a4-49de-b9af-22cf8e8734ff",
              add_on_category_id: "170b003e-99a8-4f4b-9bfe-ab7b4fe331ae",
              variation_id: "bbb7fbfb-e0f0-4639-8400-f7464857939e",
              add_on_category_name: 'Add Ons for 9" Pizza',
              cat_is_multiple: false,
              cat_max_choice: 2,
              language_slug: "en",
              add_on_category_desc: "Select up to 2 (optional)",
              add_ons: [
                {
                  _id: "9ef73112-3be5-4c96-b8db-23e7efdc5b24",
                  add_ons_name: "More Naga",
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 69,
                  addoncat_id: "170b003e-99a8-4f4b-9bfe-ab7b4fe331ae",
                  variation_and_add_on_category_id:
                    "2ee41c89-12a4-49de-b9af-22cf8e8734ff",
                },
                {
                  _id: "8d00a7fa-b5a3-4ade-bccb-bff468300019",
                  add_ons_name: 'Sausage Crust 9"',
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 99,
                  addoncat_id: "170b003e-99a8-4f4b-9bfe-ab7b4fe331ae",
                  variation_and_add_on_category_id:
                    "2ee41c89-12a4-49de-b9af-22cf8e8734ff",
                },
                {
                  _id: "390e8342-2b0e-4d3c-814f-e6fc68106693",
                  add_ons_name: "More Cheese",
                  max_choice: 0,
                  is_multiple: false,
                  add_ons_price: 148,
                  addoncat_id: "170b003e-99a8-4f4b-9bfe-ab7b4fe331ae",
                  variation_and_add_on_category_id:
                    "2ee41c89-12a4-49de-b9af-22cf8e8734ff",
                },
              ],
            },
          ],
        },
      ],
    },
  ]
  return dispatch =>
    dispatch({
      type: GET_AVAILABLE_MENU_BY_BRANCH_ID,
      // payload: response.data,
      payload: mockData,
      status: "Success",
    })
  var url = `${process.env.REACT_APP_LOCALHOST}/Order/Search?page=${page}&limit=${countPerPage}`
  const formData = {}
  return dispatch => {
    const headers = {
      "Content-Type": "application/json",

      "Access-Control-Allow-Origin": "*",
    }
    axios
      .get(url, { headers: headers })
      .then(response => {
        dispatch({
          type: GET_AVAILABLE_MENU_BY_BRANCH_ID,
          payload: response.data,
          // payload: sampleData,
          status: "Success",
        })
      })
      .catch(error => {
        dispatch({
          type: GET_AVAILABLE_MENU_BY_BRANCH_ID,
          status: "Failed",
        })
      })
  }
}

export const getAvailableMenuByBranchIdFresh = () => {
  return dispatch => {
    dispatch({
      type: "GET_AVAILABLE_MENU_BY_BRANCH_ID_FRESH",
      payload: null,
      status: "Success",
    })
  }
}
