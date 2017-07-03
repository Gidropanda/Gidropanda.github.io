(function() {
  var i, j, len, ref, responsiveVideo, rv,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  responsiveVideo = (function() {
    function responsiveVideo(video) {
      this.video = video;
      this.update = bind(this.update, this);
      if (!this.video) {
        return;
      }
      this.img = new Image(this.video.width, this.video.height);
      this.img.onload = this.update;
      this.img.className = "rv-img rv-img-" + (document.querySelectorAll('.rv-img').length + 1);
      this.img.src = "data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http://www.w3.org/2000/svg'%20viewBox%3D'0%200%20" + this.video.width + "%20" + this.video.height + "'%20%2F%3E";
      this.img.setAttribute('style', 'position:absolute; top:0; left:0; opacity:0; pointer-events:none; width: auto; height: auto; max-width: 100%;');
      this.img.style.maxWidth = this.video.width + 'px';
      this.video.parentNode.setAttribute('style', 'position:relative; padding:0;');
      this.video.parentNode.appendChild(this.img);
      window.addEventListener('resize', this.update);
    }

    responsiveVideo.prototype.update = function() {
      var ref;
      return ref = [this.img.width, this.img.height], this.video.width = ref[0], this.video.height = ref[1], ref;
    };

    return responsiveVideo;

  })();

  ref = document.querySelectorAll('.rv');
  for (i = j = 0, len = ref.length; j < len; i = ++j) {
    rv = ref[i];
    window["rv" + i] = new responsiveVideo(rv);
  }

}).call(this);