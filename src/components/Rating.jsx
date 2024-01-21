import StarIcon from "./images/StarIcon";

const rates = Array(5).fill(true).map((_, i) => i + 1);

const Rating = ({handleRateClick, rate}) => {
    return (
        <div className="rating-container">
            {rates.map((r) =>
                <StarIcon 
                    key={r}
                    width={28}
                    height={28}
                    className="p-1 rating-star"
                    fill={r <= rate ? "#ff0" : "transparent"}
                    onClick={() => handleRateClick(r)}/>
            )}
        </div>
    );
}
 
export default Rating;