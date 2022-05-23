import {storage} from 'src/config/firebaseConfig';
import {NOTIF_TYPES} from 'src/constants';
import notifMessage from 'src/utils/notifMessage';

async function uploadImage(directory, filename, image) {
  var testRef = storage.ref().child(directory + "/" + filename + ".png");  
  await testRef.put(image)
  const imgURl = await testRef.getDownloadURL()
  notifMessage(directory.toUpperCase() + " successfully uploaded.", NOTIF_TYPES.SUCCESS)
  return imgURl
}



export default uploadImage;