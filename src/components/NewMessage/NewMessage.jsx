import styles from './NewMessage.module.css';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { db, storage } from '../../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useSelector } from 'react-redux';
import { getChat } from '../../redux/chat/selectors.ts';
import File_Img from '../../img/file.svg';
import Send_Img from '../../img/send.svg';

const NewMessage = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const data = useSelector(getChat);

  useEffect(() => {
    if (FileReader && img) {
      const container = document.getElementById('preview_list');
      container.innerHTML = '';
      for (const index in img) {
        if (typeof img[index] === 'object') {
          const file = img[index];
          const fr = new FileReader();
          fr.onload = function () {
            const li = document.createElement('li');
            li.dataset.id = index;
            const span = document.createElement('span');
            span.innerHTML = '&times;';
            span.onclick = removeImage;
            const img = document.createElement('img');
            img.src = fr.result;
            li.appendChild(img);
            li.appendChild(span);
            container.appendChild(li);
          };
          fr.readAsDataURL(file);
        }
      }
    }
  }, [img]);

  const removeImage = (e) => {
    const li = e.target.closest('li');
    const id = li.dataset.id;
    const cloneImg = { ...img };
    li.remove();
    delete cloneImg[id];
    document.getElementById('message_file').value = '';
    setImg(Object.keys(cloneImg).length === 0 ? null : { ...cloneImg });
  };

  const handleSend = async () => {
    if (img) {
      if (text.trim()) {
        await updateDoc(doc(db, 'chats', data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [data.chatId + '.lastMessage']: {
            text,
          },
          [data.chatId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', data.user.uid), {
          [data.chatId + '.lastMessage']: {
            text,
          },
          [data.chatId + '.date']: serverTimestamp(),
        });
      }

      for (const index in img) {
        if (typeof img[index] === 'object') {
          const storageRef = ref(storage, uuid());

          const uploadTask = uploadBytesResumable(storageRef, img[index]);

          uploadTask.then(() => {
            getDownloadURL(storageRef).then((downloadURL) => {
              updateDoc(doc(db, 'chats', data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text: '',
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
              updateDoc(doc(db, 'userChats', currentUser.uid), {
                [data.chatId + '.lastMessage']: {
                  text: text ? text : '*Image*',
                },
                [data.chatId + '.date']: serverTimestamp(),
              });

              updateDoc(doc(db, 'userChats', data.user.uid), {
                [data.chatId + '.lastMessage']: {
                  text: text ? text : '*Image*',
                },
                [data.chatId + '.date']: serverTimestamp(),
              });
            });
          });
        }
      }
      setImg(null);
      setText('');
      document.getElementById('preview_list').innerHTML = '';
      document.getElementById('message_file').value = '';
    } else {
      if (text.trim()) {
        updateDoc(doc(db, 'chats', data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });

        updateDoc(doc(db, 'userChats', currentUser.uid), {
          [data.chatId + '.lastMessage']: {
            text,
          },
          [data.chatId + '.date']: serverTimestamp(),
        });

        updateDoc(doc(db, 'userChats', data.user.uid), {
          [data.chatId + '.lastMessage']: {
            text,
          },
          [data.chatId + '.date']: serverTimestamp(),
        });

        setText('');
        document.getElementById('message_file').value = '';
      }
    }
  };
  return (
    <>
      <div className={styles.newMessage}>
        <textarea
          name="new_message"
          placeholder="Write a message..."
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <input
          type="file"
          accept="image/*"
          multiple
          style={{ display: 'none' }}
          id="message_file"
          onChange={(e) => setImg(e.target.files)}
        />
        <label className={styles.img_label} htmlFor="message_file">
          <img height="35px" width="35px" src={File_Img} alt="file_icon" />
        </label>
        <button
          id="message_send"
          style={{ display: 'none' }}
          onClick={handleSend}
        >
          Send
        </button>
        <label className={styles.img_label} htmlFor="message_send">
          <img height="35px" width="35px" src={Send_Img} alt="send_icon" />
        </label>
      </div>
      {img && (
        <div className={styles.preview_photo}>
          <ul id="preview_list"></ul>
        </div>
      )}
    </>
  );
};

export { NewMessage };
