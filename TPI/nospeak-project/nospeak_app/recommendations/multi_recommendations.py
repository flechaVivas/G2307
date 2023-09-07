
from nospeak_app.recommendations.generate_cosine_sim import cosine_sim
from nospeak_app.recommendations.generate_cosine_sim import data_songs
import pandas as pd


def multi_recommendations(tracknames):
    recommended_song_names = []

    unique_track_names = set(tracknames)

    for trackname in tracknames:
        idx = list(data_songs.index[data_songs['Track Name'] == trackname])[0]

        score_series = pd.Series(cosine_sim[idx]).sort_values(ascending=False)

        for i in score_series.index:
            if i == idx:
                continue 
            current_track_name = data_songs.loc[i, 'Track Name']
            if current_track_name not in unique_track_names:
                recommended_song_names.append(current_track_name)
                unique_track_names.add(current_track_name)

            if len(recommended_song_names) == 10:
                return recommended_song_names  

    return recommended_song_names[:10]