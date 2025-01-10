const Card = (props) => {


    return (
    <div onClick={(e) => e.stopPropagation()} className='flex justify-center items-center'>
            <div className='flex justify-center items-center h-40 w-120 shadow-lg rounded-lg bg-slate-400  text-white text-2xl'>
            {props.children}
            </div>
    </div>
    )
}

export default Card;