import React from 'react';

interface Props {
    readAt: string[];
}

const DetailReadatCard = ({ readAt }: Props) => {
    return (
        <div className={'grid grid-cols-2 '}>
            <p className='uppercase'>read at</p>
            <div>
                {readAt
                    .sort()
                    .reverse()
                    .map((elem) => (
                        <p key={elem + '394930'} className='px-2 py-1'>
                            {elem.slice(0, 10)}
                        </p>
                    ))}
            </div>
        </div>
    );
};

export default DetailReadatCard;
