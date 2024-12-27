import { useParams } from "react-router-dom"
import { useGetSelectedStation } from "../../hooks/useGetSelectedStation"

function StationDisplay() {
    const { id } = useParams()
    const stationInfo = useGetSelectedStation({id})
    console.log(stationInfo)
    return (
        <div>StationDisplay</div>
    )
}

export default StationDisplay;