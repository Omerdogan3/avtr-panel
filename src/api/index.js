import ApiConstants from './ApiConstants';
import axios from "axios";
import notifMessage from 'src/utils/notifMessage';
import {NOTIF_TYPES, ERROR_CONSTANTS, IMAGE_UPLOAD_TYPES} from 'src/constants';
import generateHeaders from 'src/utils/generateHeaders';
 

const {GET_SHAPES,REMOVE_SHAPES,UPDATE_SHAPES,GET_SHAPE_BYID,NEW_BLEND_SHAPE,BASE_URL,
  NEW_COLOR,GET_COLORS,REMOVE_COLORS,UPDATE_COLORS,GET_COLORS_BYID,  
 BLOCK_USER, GET_PANEL_VALUES, SET_PANEL_VALUE, CHECK_PANEL_USER,PANEL_USERS, 
  } = ApiConstants;

class DataProvider {  
  
  async getPanelValues(){
    try{
      const headers = await generateHeaders
      const res = await axios.get(BASE_URL + "/" + GET_PANEL_VALUES, {headers})
      return res.data.result
    }catch (err){
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }


  async setPanelValue(id, value){
    try{
      const headers = await generateHeaders
      const res = await axios.get(BASE_URL + "/" + SET_PANEL_VALUE + "/" + id + "/" + value, {headers})
      notifMessage("", NOTIF_TYPES.SUCCESS)
    }catch (err){
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }
  
  /**
   *
   *  Shapes
   */

  async newBlendShape(shapeData){
    try{
      const res = await axios.post(BASE_URL + "/" + NEW_BLEND_SHAPE, shapeData)
      if(res.data.status){
        notifMessage(res.data.message, NOTIF_TYPES.SUCCESS)
      }else{
        notifMessage(res.data.message, NOTIF_TYPES.ERROR)
      }
    }catch{
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }

  async getAllBlendShapes(){
    try{
      const res = await axios.get(BASE_URL + "/" + GET_SHAPES)
      if(!res.data.status){
        notifMessage(res.data.message, NOTIF_TYPES.ERROR)
      }
      return res.data.shapes
    }catch{
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }

  async removeShape(shapeId){
    try{
      const res = await axios.delete(BASE_URL + "/" + REMOVE_SHAPES + "/" + shapeId)
      if(res.data.status){
        notifMessage(res.data.message, NOTIF_TYPES.SUCCESS)
      }else{
        notifMessage(res.data.message, NOTIF_TYPES.ERROR)
      }
    }catch{
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }

  async getShapeById(shapeId){
    try{
      const res = await axios.get(BASE_URL + "/" + GET_SHAPE_BYID + "/" + shapeId)
      if(res.data.status){
        notifMessage(res.data.message, NOTIF_TYPES.SUCCESS)
        return res.data
      }else{
        notifMessage(res.data.message, NOTIF_TYPES.ERROR)
      }
    }catch{
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }

  async updateShape(shapeId,shapeData){
    delete shapeData['_id']; 
    delete shapeData['type']; 
    delete shapeData['creationTime']; 
    delete shapeData['status']; 
    try{
      const res = await axios.put(BASE_URL + "/" + UPDATE_SHAPES + "/" + shapeId, shapeData)
      if(res.data.status){
        notifMessage(res.data.message, NOTIF_TYPES.SUCCESS)
      }else{
        notifMessage(res.data.message, NOTIF_TYPES.ERROR)
      }
    }catch{
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }

  /**
   * COLORS  
   * */
 
   async newColor(colorData){
    try{
      const res = await axios.post(BASE_URL + "/" + NEW_COLOR, colorData)
      if(res.data.status){
        notifMessage(res.data.message, NOTIF_TYPES.SUCCESS)
      }else{
        notifMessage(res.data.message, NOTIF_TYPES.ERROR)
      }
    }catch{
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }

  async getAllColors(){
    try{
      const res = await axios.get(BASE_URL + "/" + GET_COLORS)
      if(!res.data.status){
        notifMessage(res.data.message, NOTIF_TYPES.ERROR)
      }
      return res.data.colors
    }catch{
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }

  async removeColor(colorId){
    try{
      const res = await axios.delete(BASE_URL + "/" + REMOVE_COLORS + "/" + colorId)
      if(res.data.status){
        notifMessage(res.data.message, NOTIF_TYPES.SUCCESS)
      }else{
        notifMessage(res.data.message, NOTIF_TYPES.ERROR)
      }
    }catch{
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }

  async getColorById(colorId){
    try{
      const res = await axios.get(BASE_URL + "/" + GET_COLORS_BYID + "/" + colorId)
      if(res.data.status){
        notifMessage(res.data.message, NOTIF_TYPES.SUCCESS)
        return res.data
      }else{
        notifMessage(res.data.message, NOTIF_TYPES.ERROR)
      }
    }catch{
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }

  async updateColor(colorId,colorData){
    
    delete colorData['_id']; 
    delete colorData['type']; 
    delete colorData['creationTime']; 
    delete colorData['status']; 
    try{
      const res = await axios.put(BASE_URL + "/" + UPDATE_COLORS + "/" + colorId, colorData)
      if(res.data.status){
        notifMessage(res.data.message, NOTIF_TYPES.SUCCESS)
      }else{
        notifMessage(res.data.message, NOTIF_TYPES.ERROR)
      }
    }catch{
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }

  /**USER */
  async blockUser(uid){
    try{
      const headers = await generateHeaders
      const res = await axios.get(BASE_URL + "/" + BLOCK_USER + "/" + uid, {headers})
      notifMessage(res.data.message, NOTIF_TYPES.SUCCESS)
    }catch{
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }

  async removeUser(userId){
    try{
      const headers = await generateHeaders
      headers.userId = userId
      const res = await axios.delete(BASE_URL + "/" + PANEL_USERS, {headers})
      if(res.data.status){
        notifMessage(res.data.message, NOTIF_TYPES.SUCCESS)
      }else{
        notifMessage(res.data.message, NOTIF_TYPES.ERROR)
      }
    }catch{
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }

  async updateUser(userData){
    try{
      const headers = await generateHeaders
      const res = await axios.put(BASE_URL + "/" + PANEL_USERS, userData, {headers})
      if(res.data.status){
        notifMessage(res.data.message, NOTIF_TYPES.SUCCESS)
      }else{
        notifMessage(res.data.message, NOTIF_TYPES.ERROR)
      }
    }catch{
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }

  async checkPanelUser(email){
    try{
      const res = await axios.get(BASE_URL + "/" + CHECK_PANEL_USER + "/" + email)
      if(res.data.status){
        return res.data.userRole
      }else{
        return "NOT_AUTHORIZED"
      }

    }catch{
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return null
    }
  }

  async newUser(userData){
    try{
      const headers = await generateHeaders
      const res = await axios.post(BASE_URL + "/" + PANEL_USERS, userData, {headers})
      if(res.data.status){
        notifMessage(res.data.message, NOTIF_TYPES.SUCCESS)
      }else{
        notifMessage(res.data.message, NOTIF_TYPES.ERROR)
      }
      // return res.data.rewards
    }catch{
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }
  
  async getAllUsers(){
    try{
      const headers = await generateHeaders
      const res = await axios.get(BASE_URL + "/" + PANEL_USERS, {headers})
      if(!res.data.status){
        notifMessage(res.data.message, NOTIF_TYPES.ERROR)
      }
      return res.data.users
    }catch{
      notifMessage(ERROR_CONSTANTS.NETWORK_ERROR, NOTIF_TYPES.ERROR)
      return {"status": false}
    }
  }
}


export default new DataProvider();