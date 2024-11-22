import moment from 'moment';
import { FC, useState } from 'react'
import { HiOutlineChevronDown } from 'react-icons/hi';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSelector } from 'react-redux';

import { updateMessage } from '../../../services/messageService';
import { RootState } from '../../../redux/store';

type Props = {
    message: Message;
}

const Message: FC<Props> = ({ message }) => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [deleted, setDeleted] = useState(false);

    const handleDelete = async () => {
        const messageDoc = {
            images: null,
            text: 'This message has been deleted.'
        }
        await updateMessage(message.id, messageDoc);
        setDeleted(true);
        setIsOpen(false);
    }

    return (
        <div
            className={`
                rounded-md w-fit max-w-[85%] px-3 py-2 m-3 flex flex-col relative group space-y-3
                ${message.userId === user?.id ? 'bg-cyan-700 ml-auto' : 'bg-neutral-900'}
            `}
        >
            {
                (message.user?.id === user?.id && message.text !== 'This message has been deleted.' && !deleted)
                &&
                <div className='absolute hidden group-hover:block inset-0 z-30 bg-[#164e63b3] transition-all duration-200'>
                    {
                        isOpen
                            ?
                            <div className='top-full right-0 p-2 bg-cyan-900 shadow-xl absolute w-40 rounded-md space-y-2'>
                                <p className='text-xl font-semibold'>Delete message?</p>
                                <div className='flex justify-between items-center gap-5 mt-auto'>
                                    <button onClick={handleDelete} className='font-medium text-lg hover:underline'>Yes</button>
                                    <button onClick={() => setIsOpen(false)} className='font-medium text-lg hover:underline'>No</button>
                                </div>
                            </div>
                            :
                            <HiOutlineChevronDown onClick={() => setIsOpen(prev => !prev)} className='ml-auto text-3xl cursor-pointer' />
                    }
                </div>
            }
            {
                (message.images && message.images!.length > 0 && !deleted)
                &&
                message.images.map((image: string, index) => {
                    return (
                        <LazyLoadImage
                            key={index}
                            className='w-auto h-52 object-contain mb-2 mx-auto rounded-md'
                            effect='blur'
                            src={image}
                            alt="message"
                        />
                    )
                })
            }
            <p>{deleted ? 'This message has been deleted.' : message.text}</p>
            <div className={`flex justify-between  ${message.userId === user?.id ? 'text-neutral-300' : 'text-neutral-500'}`}>
                <p className='mr-3'>{message.user?.username !== user?.username && message.user?.username}</p>
                <p>
                    {
                        moment(message.createdAt).isSame(Date.now(), 'day')
                            ?
                            moment(message.createdAt).format('HH:mm')
                            :
                            moment(message.createdAt).format('DD MMM HH:mm')
                    }
                </p>
            </div>
        </div>
    )
}

export default Message;